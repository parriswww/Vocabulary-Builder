import { z } from "zod";

// Word schema for Firestore
export const wordSchema = z.object({
  id: z.string(),
  word: z.string().min(1, "Word is required"),
  tags: z.array(z.string()),
  definitions: z.array(z.string()).min(1, "At least one definition is required"),
  sentences: z.array(z.string()).max(30, "Maximum 30 sentences allowed"),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const insertWordSchema = wordSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type Word = z.infer<typeof wordSchema>;
export type InsertWord = z.infer<typeof insertWordSchema>;

// User metadata schema for streak tracking
export const userMetadataSchema = z.object({
  streak: z.number().default(0),
  lastVisit: z.string().nullable(),
});

export type UserMetadata = z.infer<typeof userMetadataSchema>;
