import { z } from "zod";

// Word schema for Firestore with spaced repetition tracking
export const wordSchema = z.object({
  id: z.string(),
  word: z.string().min(1, "Word is required"),
  tags: z.array(z.string()),
  definitions: z.array(z.string()).min(1, "At least one definition is required"),
  sentences: z.array(z.string()).max(30, "Maximum 30 sentences allowed"),
  createdAt: z.number(),
  updatedAt: z.number(),
  // Spaced repetition fields
  reviewCount: z.number().default(0),
  correctCount: z.number().default(0),
  masteryLevel: z.enum(['learning', 'reviewing', 'mastered']).default('learning'),
  nextReviewDate: z.number().nullable().default(null),
  lastReviewedAt: z.number().nullable().default(null),
  easeFactor: z.number().default(2.5), // SM-2 algorithm ease factor
  interval: z.number().default(1), // Days until next review
});

export const insertWordSchema = wordSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  reviewCount: true,
  correctCount: true,
  masteryLevel: true,
  nextReviewDate: true,
  lastReviewedAt: true,
  easeFactor: true,
  interval: true,
});

export type Word = z.infer<typeof wordSchema>;
export type InsertWord = z.infer<typeof insertWordSchema>;

// User metadata schema for streak tracking and statistics
export const userMetadataSchema = z.object({
  streak: z.number().default(0),
  lastVisit: z.string().nullable(),
  totalReviews: z.number().default(0),
  totalCorrect: z.number().default(0),
  wordsLearned: z.number().default(0),
  wordsMastered: z.number().default(0),
});

export type UserMetadata = z.infer<typeof userMetadataSchema>;

// Subscription schema for premium status tracking
export const subscriptionSchema = z.object({
  isPremium: z.boolean().default(false),
  subscriptionId: z.string().nullable().default(null),
  customerId: z.string().nullable().default(null),
  status: z.enum(['active', 'canceled', 'past_due', 'paused', 'trialing', 'none']).default('none'),
  priceId: z.string().nullable().default(null),
  currentPeriodEnd: z.number().nullable().default(null),
  cancelAtPeriodEnd: z.boolean().default(false),
  updatedAt: z.number().nullable().default(null),
  // Trial period fields
  trialStartDate: z.number().nullable().default(null),
  trialEndDate: z.number().nullable().default(null),
  // Admin override fields
  adminGrantedFreeUntil: z.number().nullable().default(null),
});

export type Subscription = z.infer<typeof subscriptionSchema>;

// Subscriber record for admin panel
export const subscriberRecordSchema = z.object({
  uid: z.string(),
  email: z.string().nullable().default(null),
  displayName: z.string().nullable().default(null),
  status: z.string().default('none'),
  isPremium: z.boolean().default(false),
  trialStartDate: z.number().nullable().default(null),
  trialEndDate: z.number().nullable().default(null),
  adminGrantedFreeUntil: z.number().nullable().default(null),
  subscriptionId: z.string().nullable().default(null),
  customerId: z.string().nullable().default(null),
  currentPeriodEnd: z.number().nullable().default(null),
  cancelAtPeriodEnd: z.boolean().default(false),
  updatedAt: z.number().default(0),
  referralCode: z.string().nullable().default(null),
});

export type SubscriberRecord = z.infer<typeof subscriberRecordSchema>;

// Paddle webhook event types
export const paddleWebhookEventSchema = z.object({
  event_type: z.string(),
  data: z.object({
    id: z.string(),
    status: z.string().optional(),
    customer_id: z.string().optional(),
    custom_data: z.object({
      userId: z.string().optional(),
      referralCode: z.string().optional(),
    }).optional(),
    items: z.array(z.object({
      price: z.object({
        id: z.string(),
      }).optional(),
    })).optional(),
    current_billing_period: z.object({
      ends_at: z.string().optional(),
    }).optional(),
    scheduled_change: z.object({
      action: z.string().optional(),
    }).nullable().optional(),
  }),
});

export type PaddleWebhookEvent = z.infer<typeof paddleWebhookEventSchema>;
