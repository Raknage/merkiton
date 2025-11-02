export interface Design {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  votes: number;
  createdAt: any; // Or a more specific type like Date or firebase.firestore.Timestamp
}
