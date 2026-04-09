"use client";

import styled from "styled-components";

export const PageWrapper = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing[24]};
  }
  
  ${({ theme }) => theme.media.tablet} {
    padding: 0 ${({ theme }) => theme.spacing[32]};
  }
`;

export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing[64]} 0`};

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => `calc(${theme.spacing[64]} + ${theme.spacing[32]}) 0`};
  }

  .gradient-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom right, 
      ${({ theme }) => theme.colors.primary}1A, 
      ${({ theme }) => theme.colors.background}, 
      ${({ theme }) => theme.colors.background}
    );
  }
`;

export const HeroContent = styled.div`
  position: relative;
  max-width: 48rem;
  z-index: 10;

  h1 {
    font-size: 2.25rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.foreground};
    line-height: 1.2;

    span {
      color: ${({ theme }) => theme.colors.primary};
    }

    ${({ theme }) => theme.media.tablet} {
      font-size: 3.75rem;
    }
  }

  p {
    margin-top: ${({ theme }) => theme.spacing[24]};
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.mutedForeground};
    max-width: 42rem;
    line-height: 1.6;
  }
`;

export const ButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing[32]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
  }
`;

export const StatsGrid = styled.div`
  margin-top: ${({ theme }) => theme.spacing[64]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[24]};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[16]};
  border-radius: ${({ theme }) => theme.spacing[8]};
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }

  strong {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.foreground};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes[14]};
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;

export const Section = styled.section<{ $altBg?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[48]} 0`};
  background-color: ${({ $altBg, theme }) => 
    $altBg ? `${theme.colors.card}80` : 'transparent'};
  border-top: ${({ $altBg, theme }) => 
    $altBg ? `1px solid ${theme.colors.border}` : 'none'};
  border-bottom: ${({ $altBg, theme }) => 
    $altBg ? `1px solid ${theme.colors.border}` : 'none'};

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => `${theme.spacing[64]} 0`};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
  margin-bottom: ${({ theme }) => theme.spacing[32]};

  h2 {
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.foreground};

    ${({ theme }) => theme.media.tablet} {
      font-size: 1.875rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.mutedForeground};
    margin-top: ${({ theme }) => theme.spacing[4]};
  }

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const GamesGrid = styled.div<{ $variant?: 'compact' | 'default' }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
  
  grid-template-columns: ${({ $variant }) => 
    $variant === 'compact' ? 'repeat(2, 1fr)' : '1fr'};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: ${({ $variant }) => 
      $variant === 'compact' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  }

  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.spacing[24]};
    grid-template-columns: ${({ $variant }) => 
      $variant === 'compact' ? 'repeat(6, 1fr)' : 'repeat(3, 1fr)'};
  }
`;

export const CTACard = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.spacing[16]};
  background: linear-gradient(
    to bottom right, 
    ${({ theme }) => theme.colors.primary}33, 
    ${({ theme }) => theme.colors.card}, 
    ${({ theme }) => theme.colors.card}
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[32]};
  overflow: hidden;

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.spacing[48]};
  }

  .content {
    position: relative;
    z-index: 10;
    max-width: 42rem;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.foreground};

    ${({ theme }) => theme.media.tablet} {
      font-size: 2.25rem;
    }
  }

  p {
    margin-top: ${({ theme }) => theme.spacing[16]};
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;