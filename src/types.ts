import type firebase from "firebase/compat/app";

export interface Design {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  votes: number;
  createdAt: firebase.firestore.Timestamp; // Or a more specific type like Date or firebase.firestore.Timestamp
}
