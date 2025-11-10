// src/lib/firestore.ts
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Design } from "../types";

// Get all designs (for gallery)
export async function getAllDesigns(): Promise<Design[]> {
  const designsRef = collection(db, "designs");
  const q = query(designsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Design, "id">),
  }));
}

// Get top designs (for leaderboard)
export async function getTopDesigns(limitCount = 10): Promise<Design[]> {
  const designsRef = collection(db, "designs");
  const q = query(designsRef, orderBy("votes", "desc"), limit(limitCount));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Design, "id">),
  }));
}

// Submit a new design
export async function submitDesign(
  designData: Omit<Design, "id" | "votes" | "createdAt">
): Promise<string> {
  const designsRef = collection(db, "designs");
  const docRef = await addDoc(designsRef, {
    ...designData,
    votes: 0,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// Vote on a design
export async function voteOnDesign(
  designId: string,
  userId: string
): Promise<void> {
  // Check if user already voted
  const votesRef = collection(db, "votes");
  const q = query(
    votesRef,
    where("designId", "==", designId),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("Already voted on this design");
  }

  // Add vote record
  await addDoc(votesRef, {
    designId,
    userId,
    votedAt: serverTimestamp(),
  });

  // Increment vote count
  const designRef = doc(db, "designs", designId);
  await updateDoc(designRef, {
    votes: increment(1),
  });
}

// Check if user has voted
export async function hasUserVoted(
  designId: string,
  userId: string
): Promise<boolean> {
  const votesRef = collection(db, "votes");
  const q = query(
    votesRef,
    where("designId", "==", designId),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);

  return !snapshot.empty;
}
