// src/components/VoteButton.jsx
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { signInAnonymously } from "firebase/auth";
import { voteOnDesign, hasUserVoted } from "../lib/firestore";

export default function VoteButton({ designId, initialVotes }) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Auto sign-in anonymously
  useEffect(() => {
    const initAuth = async () => {
      try {
        const result = await signInAnonymously(auth);
        setUserId(result.user.uid);

        // Check if already voted
        const voted = await hasUserVoted(designId, result.user.uid);
        setHasVoted(voted);
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    initAuth();
  }, [designId]);

  const handleVote = async () => {
    if (hasVoted || !userId || loading) return;

    setLoading(true);
    try {
      await voteOnDesign(designId, userId);
      setVotes((prev) => prev + 1);
      setHasVoted(true);
    } catch (error) {
      console.error("Vote error:", error);
      alert("Failed to vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={hasVoted || loading}
      className={`rounded-lg px-4 py-2 font-medium transition-colors ${hasVoted ? "cursor-not-allowed bg-gray-200 text-gray-500" : "bg-indigo-600 text-white hover:bg-indigo-700"} ${loading ? "opacity-50" : ""} `}
    >
      {hasVoted ? "✓ Voted" : "👍 Vote"}
    </button>
  );
}
