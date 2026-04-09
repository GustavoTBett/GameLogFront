"use client";

import React from "react";
import { Star } from "lucide-react";
import * as S from "./StarRating.styled";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  showValue = false,
}: StarRatingProps) {
  
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (interactive && onRatingChange && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onRatingChange(index + 1);
    }
  };

  return (
    <S.Container $size={size}>
      {Array.from({ length: maxRating }).map((_, index) => {
        // Cálculo do estado de cada estrela
        const filled = index < Math.floor(rating);
        const partial = !filled && index < rating;
        const state = filled ? "filled" : partial ? "partial" : "empty";
        
        return (
          <S.StarButton
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            $interactive={interactive}
            $state={state}
            $size={size}
            aria-label={interactive ? `Avaliar ${index + 1} de ${maxRating} estrelas` : undefined}
          >
            <Star />
          </S.StarButton>
        );
      })}
      
      {showValue && (
        <S.ValueText $size={size}>
          {rating.toFixed(1)}
        </S.ValueText>
      )}
    </S.Container>
  );
}