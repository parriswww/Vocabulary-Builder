import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { Subscription, PaddleWebhookEvent, SubscriberRecord } from "@shared/schema";
import path from "path";
import crypto from "crypto";

// Auto-detect Paddle environment from token/key prefix (live_ = production, test_ = sandbox)
const paddleIsLive = (process.env.PADDLE_CLIENT_TOKEN || '').startsWith('live_') 
  || (process.env.PADDLE_API_KEY || '').startsWith('live_')
  || process.env.PADDLE_ENVIRONMENT === 'production';
const PADDLE_API_URL = paddleIsLive
  ? 'https://api.paddle.com' 
  : 'https://sandbox-api.paddle.com';

const FIREBASE_API_URL = 'https://firestore.googleapis.com/v1';
const FIREBASE_AUTH_URL = 'https://identitytoolkit.googleapis.com/v1';

// --- In-memory subscriber registry ---
const subscriberRegistry = new Map<string, SubscriberRecord>();

// --- Email-based permanent free access grants (persists across sessions via Firestore) ---
// Add emails here or via POST /api/admin/grant-forever-by-email
const emailForeverGrants = new Set<string>([
  'parriswww@gmail.com',
]);
const FREE_FOREVER_TIMESTAMP = new Date('2099-12-31').getTime();

// --- Admin session tokens (token -> expiry timestamp) ---
const adminSessions = new Map<string, number>();
const ADMIN_SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours

// --- In-memory rate limiter for admin login (IP -> { count, resetAt }) ---
const adminLoginAttempts = new Map<string, { count: number; resetAt: number }>();
const ADMIN_RATE_LIMIT = 10;       // max attempts
const ADMIN_RATE_WINDOW = 15 * 60 * 1000; // 15-minute window

function checkAdminRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = adminLoginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    adminLoginAttempts.set(ip, { count: 1, resetAt: now + ADMIN_RATE_WINDOW });
    return { allowed: true };
  }
  if (record.count >= ADMIN_RATE_LIMIT) {
    return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { allowed: true };
}

// --- Paddle webhook signature verification ---
function verifyPaddleWebhook(rawBody: Buffer | string, signatureHeader: string, secret: string): boolean {
  try {
    const parts = signatureHeader.split(';');
    const tsPart = parts.find(p => p.startsWith('ts='));
    const h1Part = parts.find(p => p.startsWith('h1='));
    if (!tsPart || !h1Part) return false;

    const ts = tsPart.slice(3);
    const h1 = h1Part.slice(3);
    const signedPayload = `${ts}:${typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8')}`;
    const expected = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(h1, 'hex'));
  } catch {
    return false;
  }
}

function generateAdminToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function isValidAdminSession(token: string): boolean {
  const expiry = adminSessions.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    adminSessions.delete(token);
    return false;
  }
  return true;
}

function requireAdmin(req: Request, res: Response): boolean {
  const token = req.headers['x-admin-token'] as string;
  if (!token || !isValidAdminSession(token)) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

// --- Firestore REST API helpers ---
async function firestoreUpdateSubscription(
  projectId: string,
  appId: string,
  userId: string,
  fields: Record<string, any>
): Promise<boolean> {
  try {
    const apiKey = process.env.FIREBASE_API_KEY;
    if (!apiKey) return false;

    const docPath = `artifacts/${appId}/users/${userId}/metadata/subscription`;
    const url = `${FIREBASE_API_URL}/projects/${projectId}/databases/(default)/documents/${docPath}`;

    // Convert fields to Firestore REST format
    const firestoreFields: Record<string, any> = {};
    for (const [key, val] of Object.entries(fields)) {
      if (val === null) firestoreFields[key] = { nullValue: null };
      else if (typeof val === 'boolean') firestoreFields[key] = { booleanValue: val };
      else if (typeof val === 'number') firestoreFields[key] = { integerValue: String(val) };
      else if (typeof val === 'string') firestoreFields[key] = { stringValue: val };
    }

    const updateMask = Object.keys(fields).map(k => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join('&');
    const patchUrl = `${url}?${updateMask}&key=${apiKey}`;

    const response = await fetch(patchUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: firestoreFields }),
    });

    return response.ok;
  } catch (err) {
    console.warn('Firestore REST update failed:', err);
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // AdSense ads.txt verification file
  app.get('/ads.txt', (_req, res) => {
    res.type('text/plain').send('google.com, pub-5351173673483508, DIRECT, f08c47fec0942fa0\n');
  });

  // Apple Pay domain verification for Paddle
  app.get('/.well-known/apple-developer-merchantid-domain-association', (_req, res) => {
    const filePath = path.resolve(import.meta.dirname, '..', 'client', 'public', '.well-known', 'apple-developer-merchantid-domain-association');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.sendFile(filePath);
  });

  // Firebase config endpoint
  app.get('/api/firebase-config', (_req, res) => {
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    res.json({ config, appId: process.env.FIREBASE_PROJECT_ID || 'vocab-app' });
  });

  // Paddle config endpoint
  app.get('/api/paddle-config', (_req, res) => {
    const clientToken = process.env.PADDLE_CLIENT_TOKEN || '';
    // Auto-detect environment from token prefix: live_ = production, test_ = sandbox
    const autoEnv = clientToken.startsWith('live_') ? 'production' : 'sandbox';
    const environment = process.env.PADDLE_ENVIRONMENT || autoEnv;
    res.json({
      clientToken,
      environment,
      priceId: process.env.PADDLE_PRICE_ID || '',
    });
  });

  // --- Subscriber registration (called by frontend when trial starts or subscription activates) ---
  app.post('/api/admin/register-subscriber', async (req, res) => {
    try {
      const { uid, email, displayName, status, trialStartDate, trialEndDate, subscriptionId, customerId, isPremium, currentPeriodEnd } = req.body;
      if (!uid) return res.status(400).json({ error: 'Missing uid' });

      // Check if this email has a permanent free grant
      const normalizedEmail = (email || '').toLowerCase().trim();
      const hasPermanentGrant = normalizedEmail && emailForeverGrants.has(normalizedEmail);
      const adminGrantedFreeUntil = hasPermanentGrant
        ? FREE_FOREVER_TIMESTAMP
        : (subscriberRegistry.get(uid)?.adminGrantedFreeUntil ?? null);

      const existing = subscriberRegistry.get(uid) || {} as SubscriberRecord;
      subscriberRegistry.set(uid, {
        uid,
        email: email || existing.email || null,
        displayName: displayName || existing.displayName || null,
        status: status || existing.status || 'none',
        isPremium: isPremium ?? existing.isPremium ?? false,
        trialStartDate: trialStartDate ?? existing.trialStartDate ?? null,
        trialEndDate: trialEndDate ?? existing.trialEndDate ?? null,
        adminGrantedFreeUntil,
        subscriptionId: subscriptionId || existing.subscriptionId || null,
        customerId: customerId || existing.customerId || null,
        currentPeriodEnd: currentPeriodEnd ?? existing.currentPeriodEnd ?? null,
        cancelAtPeriodEnd: existing.cancelAtPeriodEnd ?? false,
        updatedAt: Date.now(),
      });

      // Persist permanent grant to Firestore only on first registration (prevents infinite onSnapshot loop)
      const grantAlreadyPersisted = existing.adminGrantedFreeUntil === FREE_FOREVER_TIMESTAMP;
      if (hasPermanentGrant && !grantAlreadyPersisted) {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const appId = projectId || 'vocab-app';
        if (projectId) {
          await firestoreUpdateSubscription(projectId, appId, uid, {
            adminGrantedFreeUntil: FREE_FOREVER_TIMESTAMP,
            updatedAt: Date.now(),
          });
          console.log(`Permanent free access applied for ${normalizedEmail} (uid: ${uid})`);
        }
      }

      res.json({ success: true });
    } catch (err) {
      console.error('Register subscriber error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- Get subscription override for a user (admin-extended trials, free months) ---
  app.get('/api/subscription/override/:uid', (req, res) => {
    const { uid } = req.params;
    const record = subscriberRegistry.get(uid);
    if (!record) return res.json({ override: null });

    res.json({
      override: {
        trialEndDate: record.trialEndDate,
        adminGrantedFreeUntil: record.adminGrantedFreeUntil,
        status: record.status,
      }
    });
  });

  // --- Admin: Login ---
  app.post('/api/admin/auth', (req, res) => {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const rateCheck = checkAdminRateLimit(ip);
    if (!rateCheck.allowed) {
      res.setHeader('Retry-After', String(rateCheck.retryAfter));
      return res.status(429).json({ error: `Too many login attempts. Try again in ${rateCheck.retryAfter} seconds.` });
    }

    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return res.status(503).json({ error: 'Admin not configured. Set ADMIN_PASSWORD environment variable.' });
    }
    if (!password || password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateAdminToken();
    adminSessions.set(token, Date.now() + ADMIN_SESSION_TTL);
    res.json({ token, expiresIn: ADMIN_SESSION_TTL });
  });

  // --- Admin: List all subscribers ---
  app.get('/api/admin/subscribers', (req, res) => {
    if (!requireAdmin(req, res)) return;
    const list = Array.from(subscriberRegistry.values()).sort((a, b) => b.updatedAt - a.updatedAt);
    res.json({ subscribers: list });
  });

  // --- Admin: Extend trial ---
  app.post('/api/admin/extend-trial', async (req, res) => {
    if (!requireAdmin(req, res)) return;

    const { uid, days } = req.body;
    if (!uid || !days || typeof days !== 'number') {
      return res.status(400).json({ error: 'Missing uid or days' });
    }

    const record = subscriberRegistry.get(uid);
    const currentTrialEnd = record?.trialEndDate && record.trialEndDate > Date.now()
      ? record.trialEndDate
      : Date.now();
    const newTrialEnd = currentTrialEnd + days * 24 * 60 * 60 * 1000;

    subscriberRegistry.set(uid, {
      ...(record || { uid, email: null, displayName: null, isPremium: false, status: 'trialing', subscriptionId: null, customerId: null, currentPeriodEnd: null, cancelAtPeriodEnd: false, adminGrantedFreeUntil: null, trialStartDate: null }),
      uid,
      trialEndDate: newTrialEnd,
      status: 'trialing',
      updatedAt: Date.now(),
    });

    // Try to update Firestore
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const appId = projectId || 'vocab-app';
    if (projectId) {
      await firestoreUpdateSubscription(projectId, appId, uid, {
        trialEndDate: newTrialEnd,
        status: 'trialing',
        updatedAt: Date.now(),
      });
    }

    res.json({ success: true, newTrialEnd });
  });

  // --- Admin: Grant free month ---
  app.post('/api/admin/grant-free-month', async (req, res) => {
    if (!requireAdmin(req, res)) return;

    const { uid } = req.body;
    if (!uid) return res.status(400).json({ error: 'Missing uid' });

    const record = subscriberRegistry.get(uid);
    const freeUntil = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days from now

    subscriberRegistry.set(uid, {
      ...(record || { uid, email: null, displayName: null, isPremium: false, status: 'none', subscriptionId: null, customerId: null, currentPeriodEnd: null, cancelAtPeriodEnd: false, trialStartDate: null, trialEndDate: null }),
      uid,
      adminGrantedFreeUntil: freeUntil,
      updatedAt: Date.now(),
    });

    // Try to update Firestore
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const appId = projectId || 'vocab-app';
    if (projectId) {
      await firestoreUpdateSubscription(projectId, appId, uid, {
        adminGrantedFreeUntil: freeUntil,
        updatedAt: Date.now(),
      });
    }

    res.json({ success: true, freeUntil });
  });

  // --- Admin: Grant forever free access by email ---
  app.post('/api/admin/grant-forever-by-email', async (req, res) => {
    if (!requireAdmin(req, res)) return;

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });

    const normalizedEmail = email.toLowerCase().trim();
    emailForeverGrants.add(normalizedEmail);

    // Also apply immediately to any already-registered user with this email
    let appliedToUid: string | null = null;
    for (const [uid, record] of Array.from(subscriberRegistry.entries())) {
      if ((record.email || '').toLowerCase().trim() === normalizedEmail) {
        subscriberRegistry.set(uid, { ...record, adminGrantedFreeUntil: FREE_FOREVER_TIMESTAMP, updatedAt: Date.now() });
        appliedToUid = uid;
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const appId = projectId || 'vocab-app';
        if (projectId) {
          await firestoreUpdateSubscription(projectId, appId, uid, {
            adminGrantedFreeUntil: FREE_FOREVER_TIMESTAMP,
            updatedAt: Date.now(),
          });
        }
        break;
      }
    }

    console.log(`Permanent free access granted to email: ${normalizedEmail}${appliedToUid ? ` (uid: ${appliedToUid})` : ' (will apply on next login)'}`);
    res.json({ success: true, email: normalizedEmail, appliedToUid });
  });

  // --- Admin: Logout (revoke session) ---
  app.post('/api/admin/logout', (req, res) => {
    const token = req.headers['x-admin-token'] as string;
    if (token) adminSessions.delete(token);
    res.json({ success: true });
  });

  // --- Paddle webhook handler ---
  app.post('/api/webhooks/paddle', async (req, res) => {
    try {
      const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
      if (webhookSecret) {
        const signature = req.headers['paddle-signature'] as string;
        if (!signature) {
          console.warn('Paddle webhook rejected: missing Paddle-Signature header');
          return res.status(400).send('Missing signature');
        }
        const rawBody = req.rawBody as Buffer;
        if (!verifyPaddleWebhook(rawBody, signature, webhookSecret)) {
          console.warn('Paddle webhook rejected: invalid signature');
          return res.status(400).send('Invalid signature');
        }
      } else {
        console.warn('PADDLE_WEBHOOK_SECRET not set — webhook signature verification is disabled. Set it in environment secrets.');
      }

      const event = req.body as PaddleWebhookEvent;
      console.log('Paddle webhook received:', event.event_type);

      const userId = event.data.custom_data?.userId;
      if (!userId) {
        console.log('No userId in webhook custom_data');
        return res.status(200).send('OK');
      }

      let subscriptionUpdate: Partial<Subscription> = { updatedAt: Date.now() };
      let registryUpdate: Partial<SubscriberRecord> = { uid: userId, updatedAt: Date.now() };

      switch (event.event_type) {
        case 'subscription.created':
        case 'subscription.activated':
          subscriptionUpdate = {
            ...subscriptionUpdate,
            isPremium: true,
            subscriptionId: event.data.id,
            customerId: event.data.customer_id || null,
            status: 'active',
            priceId: event.data.items?.[0]?.price?.id || null,
            currentPeriodEnd: event.data.current_billing_period?.ends_at 
              ? new Date(event.data.current_billing_period.ends_at).getTime() : null,
            cancelAtPeriodEnd: false,
          };
          registryUpdate = { ...registryUpdate, isPremium: true, status: 'active',
            subscriptionId: event.data.id, customerId: event.data.customer_id || null,
            currentPeriodEnd: subscriptionUpdate.currentPeriodEnd ?? null };
          break;

        case 'subscription.updated':
          const isCanceling = event.data.scheduled_change?.action === 'cancel';
          subscriptionUpdate = {
            ...subscriptionUpdate,
            isPremium: event.data.status === 'active',
            subscriptionId: event.data.id,
            status: event.data.status as Subscription['status'] || 'active',
            currentPeriodEnd: event.data.current_billing_period?.ends_at 
              ? new Date(event.data.current_billing_period.ends_at).getTime() : null,
            cancelAtPeriodEnd: isCanceling,
          };
          registryUpdate = { ...registryUpdate, isPremium: subscriptionUpdate.isPremium,
            status: subscriptionUpdate.status, cancelAtPeriodEnd: isCanceling,
            currentPeriodEnd: subscriptionUpdate.currentPeriodEnd ?? null };
          break;

        case 'subscription.canceled':
          subscriptionUpdate = { ...subscriptionUpdate, isPremium: false, status: 'canceled', cancelAtPeriodEnd: false };
          registryUpdate = { ...registryUpdate, isPremium: false, status: 'canceled', cancelAtPeriodEnd: false };
          break;

        case 'subscription.past_due':
          subscriptionUpdate = { ...subscriptionUpdate, isPremium: false, status: 'past_due' };
          registryUpdate = { ...registryUpdate, isPremium: false, status: 'past_due' };
          break;

        case 'subscription.paused':
          subscriptionUpdate = { ...subscriptionUpdate, isPremium: false, status: 'paused' };
          registryUpdate = { ...registryUpdate, isPremium: false, status: 'paused' };
          break;

        default:
          console.log('Unhandled webhook event:', event.event_type);
      }

      // Update subscriber registry
      const existing = subscriberRegistry.get(userId) || {} as SubscriberRecord;
      subscriberRegistry.set(userId, { ...existing, ...registryUpdate } as SubscriberRecord);

      console.log('Subscription update for user', userId, ':', subscriptionUpdate);
      res.status(200).send('OK');
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(200).send('OK');
    }
  });

  // --- Customer portal session ---
  app.post('/api/subscription/portal', async (req, res) => {
    try {
      const { customerId, subscriptionId, uid } = req.body;
      if (!customerId || !process.env.PADDLE_API_KEY) {
        return res.status(400).json({ error: 'Missing required data' });
      }

      // Verify the customerId belongs to the requesting user
      if (uid) {
        const record = subscriberRegistry.get(uid);
        if (record && record.customerId && record.customerId !== customerId) {
          return res.status(403).json({ error: 'Customer ID mismatch' });
        }
      }

      const response = await fetch(
        `${PADDLE_API_URL}/customers/${customerId}/portal-sessions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscription_ids: subscriptionId ? [subscriptionId] : [] }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error('Paddle portal error:', data);
        return res.status(response.status).json({ error: 'Failed to create portal session' });
      }
      res.json({ portalUrl: data.data?.urls?.general?.overview || null });
    } catch (error) {
      console.error('Portal session error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
