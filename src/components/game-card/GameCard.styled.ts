"use client";

import styled from "styled-components";
import Link from "next/link";

export const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
`;

export const RatingBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.background}E6;
  backdrop-filter: blur(4px);
  border-radius: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  
  span {
    font-size: ${({ theme }) => theme.fontSizes[12]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const FavoriteButton = styled.button<{ $isFavorite?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background}E6;
  backdrop-filter: blur(4px);
  transition: all 0.2s;

  svg {
    transition: colors 0.2s;
    color: ${({ $isFavorite, theme }) => 
      $isFavorite ? theme.colors.destructive : theme.colors.foreground};
    fill: ${({ $isFavorite, theme }) => 
      $isFavorite ? theme.colors.destructive : "transparent"};
  }
`;

export const CompactOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, ${({ theme }) => theme.colors.background}E6, ${({ theme }) => theme.colors.background}33, transparent);
  opacity: 0;
  transition: opacity 0.3s;
`;

export const CompactTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing[12]};
  opacity: 0;
  transition: opacity 0.3s;

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[14]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.foreground};
    
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const CompactFavoriteBtn = styled(FavoriteButton)`
  position: absolute;
  top: ${({ theme }) => theme.spacing[8]};
  right: ${({ theme }) => theme.spacing[8]};
  width: 2rem;
  height: 2rem;
  opacity: ${({ $isFavorite }) => ($isFavorite ? 1 : 0)};

  svg { width: 1rem; height: 1rem; }
`;

export const CompactContainer = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.spacing[8]};
  background-color: ${({ theme }) => theme.colors.secondary};

  .rating-position {
    position: absolute;
    top: ${({ theme }) => theme.spacing[8]};
    left: ${({ theme }) => theme.spacing[8]};
  }
`;

export const DefaultContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.spacing[8]};
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease-in-out;
`;

export const DefaultImageContainer = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;

  .gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, ${({ theme }) => theme.colors.background}, ${({ theme }) => theme.colors.background}33, transparent);
  }

  .rating-position {
    position: absolute;
    top: ${({ theme }) => theme.spacing[12]};
    left: ${({ theme }) => theme.spacing[12]};
  }
`;

export const DefaultFavoriteBtn = styled(FavoriteButton)`
  position: absolute;
  top: ${({ theme }) => theme.spacing[12]};
  right: ${({ theme }) => theme.spacing[12]};
  width: 2.25rem;
  height: 2.25rem;

  svg { width: 1.25rem; height: 1.25rem; }

  &:hover svg {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const DefaultContent = styled.div`
  padding: ${({ theme }) => theme.spacing[16]};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[16]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.foreground};
    transition: color 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes[14]};
    color: ${({ theme }) => theme.colors.mutedForeground};
    margin-top: ${({ theme }) => theme.spacing[4]};
  }
`;

export const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[12]};
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[12]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const CardLink = styled(Link)`
  display: block;
  text-decoration: none;

  &:hover {
    ${StyledImage} {
      transform: scale(1.05);
    }
    
    ${CompactOverlay}, ${CompactTitle}, ${CompactFavoriteBtn} {
      opacity: 1;
    }

    ${DefaultContainer} {
      border-color: ${({ theme }) => theme.colors.primary}80;
      box-shadow: 0 10px 15px -3px ${({ theme }) => theme.colors.primary}1A;
    }
    
    ${DefaultContent} h3 {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;