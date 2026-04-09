"use client";

import Image from "next/image";
import { Star, Heart } from "lucide-react";
import * as S from "./GameCard.styled";
import { Badge } from "@/components/ui/badge/Badge";
import type { Game } from "@/lib/mock-data";

interface GameCardProps {
  game: Game;
  isFavorite?: boolean;
  onFavoriteToggle?: (gameId: string) => void;
  showFavoriteButton?: boolean;
  variant?: "default" | "compact";
}

export function GameCard({
  game,
  isFavorite = false,
  onFavoriteToggle,
  showFavoriteButton = true,
  variant = "default",
}: GameCardProps) {
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(game.id);
  };

  if (variant === "compact") {
    return (
      <S.CardLink href={`/games/${game.id}`}>
        <S.CompactContainer>
          <S.StyledImage
            as={Image}
            src={game.cover}
            alt={game.title}
            fill
          />
          <S.CompactOverlay />
          
          <div className="rating-position">
            <S.RatingBadge>
              <Star size={12} fill="currentColor" className="text-accent" />
              <span>{game.averageRating.toFixed(1)}</span>
            </S.RatingBadge>
          </div>

          {showFavoriteButton && (
            <S.CompactFavoriteBtn 
              $isFavorite={isFavorite} 
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart />
            </S.CompactFavoriteBtn>
          )}

          <S.CompactTitle>
            <h3>{game.title}</h3>
          </S.CompactTitle>
        </S.CompactContainer>
      </S.CardLink>
    );
  }

  // Variant: Default
  return (
    <S.CardLink href={`/games/${game.id}`}>
      <S.DefaultContainer>
        
        <S.DefaultImageContainer>
          <S.StyledImage
            as={Image}
            src={game.cover}
            alt={game.title}
            fill
          />
          <div className="gradient" />

          <div className="rating-position">
            <S.RatingBadge>
              <Star size={16} fill="currentColor" className="text-accent" />
              <span>{game.averageRating.toFixed(1)}</span>
            </S.RatingBadge>
          </div>

          {showFavoriteButton && (
            <S.DefaultFavoriteBtn 
              $isFavorite={isFavorite} 
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart />
            </S.DefaultFavoriteBtn>
          )}
        </S.DefaultImageContainer>

        <S.DefaultContent>
          <h3>{game.title}</h3>
          <p>{game.releaseYear}</p>
          
          <S.GenreTags>
            {game.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
            {game.genres.length > 2 && (
              <Badge variant="secondary">
                +{game.genres.length - 2}
              </Badge>
            )}
          </S.GenreTags>

          <S.MetaInfo>
            <span>{game.totalReviews} avaliações</span>
          </S.MetaInfo>
        </S.DefaultContent>

      </S.DefaultContainer>
    </S.CardLink>
  );
}