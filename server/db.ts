import pg from 'pg';
import type { SubscriberRecord } from '@shared/schema';

const { Pool } = pg;

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ── Row ↔ SubscriberRecord helpers ─────────────────────────────────────────

// pg returns BIGINT columns as strings — parse them back to numbers
function bigint(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = typeof v === 'string' ? parseInt(v, 10) : Number(v);
  return isNaN(n) ? null : n;
}

function rowToRecord(row: Record<string, unknown>): SubscriberRecord {
  return {
    uid:                  row.uid                   as string,
    email:                (row.email                ?? null) as string | null,
    displayName:          (row.display_name         ?? null) as string | null,
    status:               (row.status               ?? 'none') as string,
    isPremium:            (row.is_premium            ?? false) as boolean,
    trialStartDate:       bigint(row.trial_start_date),
    trialEndDate:         bigint(row.trial_end_date),
    adminGrantedFreeUntil:bigint(row.admin_granted_free_until),
    subscriptionId:       (row.subscription_id      ?? null) as string | null,
    customerId:           (row.customer_id          ?? null) as string | null,
    currentPeriodEnd:     bigint(row.current_period_end),
    cancelAtPeriodEnd:    (row.cancel_at_period_end ?? false) as boolean,
    updatedAt:            bigint(row.updated_at) ?? 0,
    referralCode:         (row.referral_code        ?? null) as string | null,
  };
}

// ── Auto-migration: ensure table exists and referral_code column exists ──────

export async function dbInit(): Promise<void> {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        uid TEXT PRIMARY KEY,
        email TEXT,
        display_name TEXT,
        status TEXT NOT NULL DEFAULT 'none',
        is_premium BOOLEAN NOT NULL DEFAULT FALSE,
        trial_start_date BIGINT,
        trial_end_date BIGINT,
        admin_granted_free_until BIGINT,
        subscription_id TEXT,
        customer_id TEXT,
        current_period_end BIGINT,
        cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
        updated_at BIGINT NOT NULL DEFAULT 0,
        referral_code TEXT
      )
    `);
    // Add referral_code column to existing tables that pre-date this migration
    await pool.query(`
      ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS referral_code TEXT
    `);
    console.log('[db] subscribers table ready');
  } catch (err) {
    console.error('[db] Failed to initialize database:', err);
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

export async function dbGetSubscriber(uid: string): Promise<SubscriberRecord | null> {
  const res = await pool.query('SELECT * FROM subscribers WHERE uid = $1', [uid]);
  return res.rows.length ? rowToRecord(res.rows[0]) : null;
}

export async function dbGetAllSubscribers(): Promise<SubscriberRecord[]> {
  const res = await pool.query('SELECT * FROM subscribers ORDER BY updated_at DESC');
  return res.rows.map(rowToRecord);
}

export async function dbFindSubscriberByEmail(email: string): Promise<SubscriberRecord | null> {
  const res = await pool.query(
    'SELECT * FROM subscribers WHERE LOWER(email) = LOWER($1) LIMIT 1',
    [email],
  );
  return res.rows.length ? rowToRecord(res.rows[0]) : null;
}

export async function dbUpsertSubscriber(record: SubscriberRecord): Promise<void> {
  await pool.query(
    `INSERT INTO subscribers (
        uid, email, display_name, status, is_premium,
        trial_start_date, trial_end_date, admin_granted_free_until,
        subscription_id, customer_id, current_period_end,
        cancel_at_period_end, updated_at, referral_code
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      )
      ON CONFLICT (uid) DO UPDATE SET
        email                   = COALESCE(EXCLUDED.email, subscribers.email),
        display_name            = COALESCE(EXCLUDED.display_name, subscribers.display_name),
        status                  = EXCLUDED.status,
        is_premium              = EXCLUDED.is_premium,
        trial_start_date        = EXCLUDED.trial_start_date,
        trial_end_date          = EXCLUDED.trial_end_date,
        admin_granted_free_until= EXCLUDED.admin_granted_free_until,
        subscription_id         = COALESCE(EXCLUDED.subscription_id, subscribers.subscription_id),
        customer_id             = COALESCE(EXCLUDED.customer_id, subscribers.customer_id),
        current_period_end      = EXCLUDED.current_period_end,
        cancel_at_period_end    = EXCLUDED.cancel_at_period_end,
        updated_at              = EXCLUDED.updated_at,
        referral_code           = COALESCE(EXCLUDED.referral_code, subscribers.referral_code)`,
    [
      record.uid,
      record.email ?? null,
      record.displayName ?? null,
      record.status ?? 'none',
      record.isPremium ?? false,
      record.trialStartDate ?? null,
      record.trialEndDate ?? null,
      record.adminGrantedFreeUntil ?? null,
      record.subscriptionId ?? null,
      record.customerId ?? null,
      record.currentPeriodEnd ?? null,
      record.cancelAtPeriodEnd ?? false,
      record.updatedAt ?? Date.now(),
      record.referralCode ?? null,
    ],
  );
}
