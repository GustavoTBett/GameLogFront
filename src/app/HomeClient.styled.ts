import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}16 0%,
    ${({ theme }) => theme.colors.background} 40%,
    ${({ theme }) => theme.colors.background} 100%
  );
`;

export const Container = styled.div`
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[24]} ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.spacing[32]} ${({ theme }) => theme.spacing[24]};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.spacing[48]} ${({ theme }) => theme.spacing[32]};
  }
`;

export const HeroTitle = styled.h1`
  max-width: 48rem;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  letter-spacing: -0.03em;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[48]};
  }
`;

export const HeroAccent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const HeroDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[16]};
  max-width: 44rem;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.mutedForeground};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[18]};
  }
`;

export const HeroActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing[24]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};

  ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
  }
`;

export const HeroButton = styled(Link)<{ $variant?: "primary" | "outline" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[16]}`};
  border-radius: ${({ theme }) => theme.spacing[8]};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "outline" ? theme.colors.border : theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.2s ease;
  background: ${({ theme, $variant }) =>
    $variant === "outline" ? "transparent" : theme.colors.primary};
  color: ${({ theme, $variant }) =>
    $variant === "outline" ? theme.colors.foreground : theme.colors.primaryForeground};

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.95);
  }
`;

export const StatsGrid = styled.div`
  margin-top: ${({ theme }) => theme.spacing[32]};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[12]};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing[16]};
  }
`;

export const StatCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing[16]};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing[8]};
`;

export const StatValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[24]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[12]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const Section = styled.section<{ $muted?: boolean }>`
  padding: ${({ theme }) => theme.spacing[32]} 0;
  background: ${({ theme, $muted }) => ($muted ? `${theme.colors.card}80` : "transparent")};
  border-top: ${({ theme, $muted }) => ($muted ? `1px solid ${theme.colors.border}` : "none")};
  border-bottom: ${({ theme, $muted }) => ($muted ? `1px solid ${theme.colors.border}` : "none")};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[12]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

export const SectionTitleWrap = styled.div``;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes[24]};
`;

export const SectionSubtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const SectionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const CardsGridCompact = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[12]};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.laptop} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

export const CardsGridDefault = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.laptop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const GameCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

export const GameCover = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

export const GameBody = styled.div`
  padding: ${({ theme }) => theme.spacing[12]};
`;

export const GameTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes[16]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondaryForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;

export const FiltersWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[12]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[12]}`};
  border-radius: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Pagination = styled.div`
  margin-top: ${({ theme }) => theme.spacing[16]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[12]};
`;

export const PaginationButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[12]}`};
  border-radius: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.foreground};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing[24]};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const ErrorState = styled(EmptyState)`
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.destructive}55;
  color: ${({ theme }) => theme.colors.destructive};
`;
