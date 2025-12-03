// Storage interface for server-side data
// Note: This app primarily uses Firebase/Firestore on the client side
// This file is kept for potential future server-side storage needs

export interface IStorage {
  // Add methods as needed for server-side storage
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize any in-memory storage as needed
  }
}

export const storage = new MemStorage();
