"use client";

import { useState } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { ratingsAPI } from "@/lib/api";
import { RatingVoteType } from "@/types/rating";

interface ReviewVoteControlsProps {
  ratingId: number;
  upvoteCount: number;
  downvoteCount: number;
  userVote?: RatingVoteType | null;
  isAuthenticated: boolean;
  isOwnReview?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: nowrap;
  justify-content: flex-end;
`;

const VoteButton = styled.button<{ $active?: boolean; $tone: "up" | "down" }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  border-radius: 9999px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $active, $tone }) => {
    if ($active && $tone === "up") return `${theme.colors.primary}20`;
    if ($active && $tone === "down") return `${theme.colors.destructive}20`;
    return theme.colors.secondary;
  }};
  color: ${({ theme, $active, $tone }) => {
    if ($active && $tone === "up") return theme.colors.primary;
    if ($active && $tone === "down") return theme.colors.destructive;
    return theme.colors.foreground;
  }};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
  min-width: 4.25rem;
  justify-content: center;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75rem;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[6]}`};
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export function ReviewVoteControls({
  ratingId,
  upvoteCount: initialUpvotes,
  downvoteCount: initialDownvotes,
  userVote: initialUserVote,
  isAuthenticated,
  isOwnReview = false,
}: ReviewVoteControlsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(initialUpvotes);
  const [downvoteCount, setDownvoteCount] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<RatingVoteType | null | undefined>(initialUserVote);

  const canInteract = isAuthenticated && !isOwnReview && !isSubmitting;

  const handleVote = async (voteType: RatingVoteType) => {
    if (!canInteract) return;

    // Store previous state in case we need to rollback
    const prevUpvotes = upvoteCount;
    const prevDownvotes = downvoteCount;
    const prevUserVote = userVote;

    // Optimistic update
    if (userVote === voteType) {
      // Toggle off: remove the vote
      if (voteType === "UPVOTE") {
        setUpvoteCount(Math.max(0, upvoteCount - 1));
      } else {
        setDownvoteCount(Math.max(0, downvoteCount - 1));
      }
      setUserVote(null);
    } else {
      // New vote or switch vote
      if (voteType === "UPVOTE") {
        setUpvoteCount(upvoteCount + 1);
        if (userVote === "DOWNVOTE") {
          setDownvoteCount(Math.max(0, downvoteCount - 1));
        }
      } else {
        setDownvoteCount(downvoteCount + 1);
        if (userVote === "UPVOTE") {
          setUpvoteCount(Math.max(0, upvoteCount - 1));
        }
      }
      setUserVote(voteType);
    }

    setIsSubmitting(true);
    try {
      await ratingsAPI.vote(ratingId, { voteType });
    } catch (error) {
      // Rollback on error
      setUpvoteCount(prevUpvotes);
      setDownvoteCount(prevDownvotes);
      setUserVote(prevUserVote);
      console.error("Failed to vote:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <VoteButton
        type="button"
        $tone="up"
        $active={userVote === "UPVOTE"}
        onClick={() => handleVote("UPVOTE")}
        disabled={!canInteract}
        aria-label={`Voto positivo, ${upvoteCount} votos`}
        aria-pressed={userVote === "UPVOTE"}
        title={isOwnReview ? "Você não pode votar na sua própria review" : !isAuthenticated ? "Faça login para votar" : undefined}
      >
        {isSubmitting && userVote !== "DOWNVOTE" ? <Loader2 size={11} className="animate-spin" /> : <ChevronUp size={11} />}
        <Count>{upvoteCount}</Count>
      </VoteButton>

      <VoteButton
        type="button"
        $tone="down"
        $active={userVote === "DOWNVOTE"}
        onClick={() => handleVote("DOWNVOTE")}
        disabled={!canInteract}
        aria-label={`Voto negativo, ${downvoteCount} votos`}
        aria-pressed={userVote === "DOWNVOTE"}
        title={isOwnReview ? "Você não pode votar na sua própria review" : !isAuthenticated ? "Faça login para votar" : undefined}
      >
        {isSubmitting && userVote !== "UPVOTE" ? <Loader2 size={11} className="animate-spin" /> : <ChevronDown size={11} />}
        <Count>{downvoteCount}</Count>
      </VoteButton>
    </Wrapper>
  );
}