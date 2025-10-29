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
