"use client";

import { KeyboardEvent } from "react";
import { Star } from "lucide-react";
import styled from "styled-components";
import { Button as UIButton } from '@/components/ui/button/Button'

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
}

const sizes = {
  sm: 16,
  md: 20,
  lg: 28,
};

const Wrapper = styled.div<{ $gap: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $gap }) => $gap};
`;

/* Use shared UI Button for icon buttons to keep focus/hover consistent */

const Value = styled.span<{ $size: "sm" | "md" | "lg" }>`
  margin-left: 0.5rem;
  font-weight: 700;
  font-size: ${({ $size, theme }) => {
    if ($size === "sm") return theme.fontSizes[12];
    if ($size === "md") return theme.fontSizes[14];
    return theme.fontSizes[16];
  }};
  color: ${({ theme }) => theme.colors.foreground};
`;

export function StarRating({
  rating,
  maxRating = 10,
  size = "md",
  interactive = false,
  onRatingChange,
  showValue = false,
}: StarRatingProps) {
  const iconSize = sizes[size];
  const gap = size === "sm" ? "0.125rem" : size === "lg" ? "0.375rem" : "0.25rem";

  const handleSelect = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!interactive || !onRatingChange) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onRatingChange(index + 1);
    }
  };

  return (
    <Wrapper $gap={gap} aria-label={`Avaliação ${rating.toFixed(1)} de ${maxRating}`}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const filled = index < Math.floor(rating);
        const partial = !filled && index < rating;

        return (
          <UIButton
              key={index}
              size={size === 'sm' ? 'icon-sm' : size === 'lg' ? 'icon-lg' : 'icon'}
              variant={interactive ? 'ghost' : 'ghost'}
              type="button"
              onClick={() => handleSelect(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              aria-label={interactive ? `Avaliar com ${index + 1} estrelas` : undefined}
              disabled={!interactive}
            >
              <Star
                size={iconSize}
                fill={filled || partial ? "currentColor" : "none"}
                opacity={filled ? 1 : partial ? 0.6 : 0.35}
              />
            </UIButton>
        );
      })}

      {showValue ? <Value $size={size}>{rating.toFixed(1)}</Value> : null}
    </Wrapper>
  );
}