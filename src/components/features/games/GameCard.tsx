"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { ArrowRight, Star } from "lucide-react";
import { GameSummary } from "@/types/game";

interface GameCardProps {
  game: GameSummary;
  href: string;
}

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;

  &:hover article {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.shadow3};
  }

  &:hover .game-card-cover img {
    transform: scale(1.03);
  }

  &:hover .game-card-hint {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus-visible article {
    outline: 2px solid ${({ theme }) => theme.colors.ring};
    outline-offset: 3px;
  }
`;

const CardShell = styled.article`
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
`;

const Cover = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }
`;

const CoverFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing[16]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  text-align: center;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[12]};
  left: ${({ theme }) => theme.spacing[12]};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.background}E6;
  backdrop-filter: blur(8px);
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Hint = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing[12]};
  bottom: ${({ theme }) => theme.spacing[12]};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: ${({ theme }) => theme.fontSizes[10]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.02em;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
`;

const Body = styled.div`
  padding: ${({ theme }) => theme.spacing[12]};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes[16]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  transition: color 0.2s ease;

  ${CardLink}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondaryForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;

function formatReleaseDate(releaseDate: string | null): string {
  if (!releaseDate) return "Sem data";

  return new Date(`${releaseDate}T00:00:00`).toLocaleDateString("pt-BR");
}

export function GameCard({ game, href }: GameCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <CardLink href={href} aria-label={`Abrir detalhes de ${game.name}`}>
      <CardShell>
        <Cover className="game-card-cover">
          {!imageError && game.coverUrl ? (
            <img
              src={game.coverUrl}
              alt={`Capa de ${game.name}`}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <CoverFallback>{game.name}</CoverFallback>
          )}

          <RatingBadge>
            <Star size={14} fill="currentColor" />
            {game.averageRating.toFixed(1)}
          </RatingBadge>

          <Hint className="game-card-hint">
            Ver detalhes
            <ArrowRight size={12} />
          </Hint>
        </Cover>

        <Body>
          <Title>{game.name}</Title>

          <MetaRow>
            <span>{formatReleaseDate(game.releaseDate)}</span>
            <span>{game.totalReviews} avaliações</span>
          </MetaRow>

          <MetaRow style={{ marginTop: "8px" }}>
            {game.genres.slice(0, 2).map((genre) => (
              <Badge key={genre}>{genre}</Badge>
            ))}
            {game.platforms.slice(0, 2).map((platform) => (
              <Badge key={platform}>{platform}</Badge>
            ))}
          </MetaRow>
        </Body>
      </CardShell>
    </CardLink>
  );
}