import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { Subscription, PaddleWebhookEvent } from "@shared/schema";

const PADDLE_API_URL = process.env.PADDLE_ENVIRONMENT === 'production' 
  ? 'https://api.paddle.com' 
  : 'https://sandbox-api.paddle.com';

export async function registerRoutes(app: Express): Promise<Server> {
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
    
    res.json({
      config,
      appId: process.env.FIREBASE_PROJECT_ID || 'vocab-app',
    });
  });

  // Paddle config endpoint - provides client token for Paddle.js
  app.get('/api/paddle-config', (_req, res) => {
    res.json({
      clientToken: process.env.PADDLE_CLIENT_TOKEN || '',
      environment: process.env.PADDLE_ENVIRONMENT || 'sandbox',
      priceId: process.env.PADDLE_PRICE_ID || '',
    });
  });

  // Paddle webhook handler
  app.post('/api/webhooks/paddle', async (req, res) => {
    try {
      const event = req.body as PaddleWebhookEvent;
      console.log('Paddle webhook received:', event.event_type);

      const userId = event.data.custom_data?.userId;
      if (!userId) {
        console.log('No userId in webhook custom_data');
        return res.status(200).send('OK');
      }

      let subscriptionUpdate: Partial<Subscription> = {
        updatedAt: Date.now(),
      };

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
              ? new Date(event.data.current_billing_period.ends_at).getTime() 
              : null,
            cancelAtPeriodEnd: false,
          };
          break;

        case 'subscription.updated':
          const isCanceling = event.data.scheduled_change?.action === 'cancel';
          subscriptionUpdate = {
            ...subscriptionUpdate,
            isPremium: event.data.status === 'active',
            subscriptionId: event.data.id,
            status: event.data.status as Subscription['status'] || 'active',
            currentPeriodEnd: event.data.current_billing_period?.ends_at 
              ? new Date(event.data.current_billing_period.ends_at).getTime() 
              : null,
            cancelAtPeriodEnd: isCanceling,
          };
          break;

        case 'subscription.canceled':
          subscriptionUpdate = {
            ...subscriptionUpdate,
            isPremium: false,
            status: 'canceled',
            cancelAtPeriodEnd: false,
          };
          break;

        case 'subscription.past_due':
          subscriptionUpdate = {
            ...subscriptionUpdate,
            isPremium: false,
            status: 'past_due',
          };
          break;

        case 'subscription.paused':
          subscriptionUpdate = {
            ...subscriptionUpdate,
            isPremium: false,
            status: 'paused',
          };
          break;

        default:
          console.log('Unhandled webhook event:', event.event_type);
      }

      // Store subscription update (will be handled by frontend via Firestore)
      // The frontend listens to Firestore and will update accordingly
      console.log('Subscription update for user', userId, ':', subscriptionUpdate);

      res.status(200).send('OK');
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(200).send('OK'); // Always return 200 to prevent retries
    }
  });

  // Create customer portal session for managing subscription
  app.post('/api/subscription/portal', async (req, res) => {
    try {
      const { customerId, subscriptionId } = req.body;

      if (!customerId || !process.env.PADDLE_API_KEY) {
        return res.status(400).json({ error: 'Missing required data' });
      }

      const response = await fetch(
        `${PADDLE_API_URL}/customers/${customerId}/portal-sessions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscription_ids: subscriptionId ? [subscriptionId] : [],
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Paddle portal error:', data);
        return res.status(response.status).json({ error: 'Failed to create portal session' });
      }

      res.json({ 
        portalUrl: data.data?.urls?.general?.overview || null 
      });
    } catch (error) {
      console.error('Portal session error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
