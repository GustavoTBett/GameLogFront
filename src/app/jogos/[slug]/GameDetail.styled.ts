import Link from "next/link";
import styled, { type DefaultTheme } from "styled-components";

const fromTheme = <T,>(selector: (theme: DefaultTheme) => T) =>
  ({ theme }: { theme: DefaultTheme }) => selector(theme);

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${fromTheme((theme) => theme.colors.background)};
`;

export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: ${fromTheme((theme) => theme.spacing[24])} ${fromTheme((theme) => theme.spacing[16])};

  ${fromTheme((theme) => theme.media.mobile)} {
    padding: ${fromTheme((theme) => theme.spacing[32])} ${fromTheme((theme) => theme.spacing[24])};
  }

  ${fromTheme((theme) => theme.media.tablet)} {
    padding: ${fromTheme((theme) => theme.spacing[32])} ${fromTheme((theme) => theme.spacing[32])};
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${fromTheme((theme) => theme.spacing[8])};
  margin-bottom: ${fromTheme((theme) => theme.spacing[24])};
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
  font-size: ${fromTheme((theme) => theme.fontSizes[14])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.medium)};

  &:hover {
    color: ${fromTheme((theme) => theme.colors.foreground)};
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: ${fromTheme((theme) => theme.spacing[24])};

  ${fromTheme((theme) => theme.media.laptop)} {
    grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
    gap: ${fromTheme((theme) => theme.spacing[32])};
  }
`;

export const Card = styled.section`
  border: 1px solid ${fromTheme((theme) => theme.colors.border)};
  border-radius: ${fromTheme((theme) => theme.spacing[8])};
  background: ${fromTheme((theme) => theme.colors.card)};
  box-shadow: ${fromTheme((theme) => theme.shadows.shadow1)};
  overflow: hidden;
`;

export const Cover = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: linear-gradient(
    120deg,
    ${fromTheme((theme) => theme.colors.secondary)} 0%,
    ${fromTheme((theme) => theme.colors.background)} 100%
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const CoverFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: ${fromTheme((theme) => theme.spacing[16])};
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
  text-align: center;
`;

export const CardBody = styled.div`
  padding: ${fromTheme((theme) => theme.spacing[16])};
`;

export const Title = styled.h1`
  font-size: ${fromTheme((theme) => theme.fontSizes[32])};
  line-height: ${fromTheme((theme) => theme.lineHeights.tight)};
  letter-spacing: -0.03em;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${fromTheme((theme) => theme.spacing[12])};

  ${fromTheme((theme) => theme.media.mobile)} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const FavoriteButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${fromTheme((theme) => theme.spacing[8])};
  min-height: 2.75rem;
  padding: ${fromTheme((theme) => `${theme.spacing[10]} ${theme.spacing[16]}`)};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.destructive : theme.colors.border)};
  border-radius: ${fromTheme((theme) => theme.spacing[8])};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.destructive}14` : theme.colors.card)};
  color: ${({ theme, $active }) => ($active ? theme.colors.destructive : theme.colors.foreground)};
  cursor: pointer;
  font-size: ${fromTheme((theme) => theme.fontSizes[14])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.medium)};
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${fromTheme((theme) => theme.colors.destructive)};
    color: ${fromTheme((theme) => theme.colors.destructive)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }

  .spin {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SubTitle = styled.p`
  margin-top: ${fromTheme((theme) => theme.spacing[8])};
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
  font-size: ${fromTheme((theme) => theme.fontSizes[14])};
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${fromTheme((theme) => theme.spacing[8])};
  margin-top: ${fromTheme((theme) => theme.spacing[16])};
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${fromTheme((theme) => `${theme.spacing[4]} ${theme.spacing[8]}`)};
  border-radius: 9999px;
  background: ${fromTheme((theme) => theme.colors.secondary)};
  color: ${fromTheme((theme) => theme.colors.secondaryForeground)};
  font-size: ${fromTheme((theme) => theme.fontSizes[12])};
`;

export const MetricRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${fromTheme((theme) => theme.spacing[12])};
  margin-top: ${fromTheme((theme) => theme.spacing[16])};
`;

export const MetricRowThree = styled(MetricRow)`
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ${fromTheme((theme) => theme.media.tablet)} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Metric = styled.div`
  padding: ${fromTheme((theme) => theme.spacing[12])};
  border-radius: ${fromTheme((theme) => theme.spacing[8])};
  background: ${fromTheme((theme) => theme.colors.secondary)};
`;

export const MetricLabel = styled.p`
  font-size: ${fromTheme((theme) => theme.fontSizes[12])};
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
`;

export const MetricValue = styled.div`
  margin-top: ${fromTheme((theme) => theme.spacing[4])};
  font-size: ${fromTheme((theme) => theme.fontSizes[18])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.bold)};
`;

export const Section = styled.section`
  margin-top: ${fromTheme((theme) => theme.spacing[32])};
`;

export const DescriptionGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${fromTheme((theme) => theme.spacing[16])};
  margin-top: ${fromTheme((theme) => theme.spacing[16])};

  ${fromTheme((theme) => theme.media.tablet)} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const DescriptionColumn = styled.div`
  border: 1px solid ${fromTheme((theme) => theme.colors.border)};
  border-radius: ${fromTheme((theme) => theme.spacing[8])};
  background: ${fromTheme((theme) => theme.colors.card)};
  padding: ${fromTheme((theme) => theme.spacing[16])};
`;

export const DescriptionColumnTitle = styled.h3`
  font-size: ${fromTheme((theme) => theme.fontSizes[16])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.bold)};
`;

export const SectionTitle = styled.h2`
  font-size: ${fromTheme((theme) => theme.fontSizes[24])};
`;

export const Paragraph = styled.p`
  margin-top: ${fromTheme((theme) => theme.spacing[12])};
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
  line-height: ${fromTheme((theme) => theme.lineHeights.tall)};
`;

export const DetailCard = styled(Card)`
  padding: ${fromTheme((theme) => theme.spacing[16])};
`;

export const EmptyState = styled.div`
  display: grid;
  gap: ${fromTheme((theme) => theme.spacing[12])};
  place-items: center;
  text-align: center;
  padding: ${fromTheme((theme) => theme.spacing[24])};
  border: 1px dashed ${fromTheme((theme) => theme.colors.border)};
  border-radius: ${fromTheme((theme) => theme.spacing[8])};
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
`;

export const EmptyIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  background: ${fromTheme((theme) => theme.colors.secondary)};
  color: ${fromTheme((theme) => theme.colors.primary)};
`;

export const SecondaryMetric = styled(Metric)`
  border: 1px solid ${fromTheme((theme) => theme.colors.border)};
  background: ${fromTheme((theme) => theme.colors.card)};
`;

export const ReviewFormWrap = styled.div`
  margin-top: ${fromTheme((theme) => theme.spacing[24])};
`;

export const ReviewList = styled.div`
  display: grid;
  gap: ${fromTheme((theme) => theme.spacing[8])};
  margin-top: ${fromTheme((theme) => theme.spacing[24])};
`;

export const ReviewCard = styled.article`
  display: grid;
  gap: ${fromTheme((theme) => theme.spacing[16])};
  padding: ${fromTheme((theme) => theme.spacing[24])} 0;
  border-bottom: 1px solid ${fromTheme((theme) => theme.colors.border)};

  ${fromTheme((theme) => theme.media.tablet)} {
    grid-template-columns: minmax(0, 11.5rem) minmax(0, 1fr);
    gap: ${fromTheme((theme) => theme.spacing[24])};
  }
`;

export const ReviewAvatarColumn = styled.div`
  display: flex;
  align-items: center;
  gap: ${fromTheme((theme) => theme.spacing[12])};

  ${fromTheme((theme) => theme.media.tablet)} {
    flex-direction: column;
    align-items: center;
    gap: ${fromTheme((theme) => theme.spacing[16])};
    padding-right: ${fromTheme((theme) => theme.spacing[24])};
    border-right: 1px solid ${fromTheme((theme) => theme.colors.border)};
  }
`;

export const ReviewAvatar = styled.div`
  width: 5rem;
  height: 5rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  border: 2px solid ${fromTheme((theme) => theme.colors.border)};
  background: ${fromTheme((theme) => theme.colors.secondary)};
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
`;

export const ReviewUsername = styled.h3`
  font-size: ${fromTheme((theme) => theme.fontSizes[20])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.bold)};
  line-height: ${fromTheme((theme) => theme.lineHeights.tight)};

  ${fromTheme((theme) => theme.media.tablet)} {
    text-align: center;
  }
`;

export const ReviewContentColumn = styled.div`
  display: grid;
  gap: ${fromTheme((theme) => theme.spacing[16])};
  min-width: 0;

  ${fromTheme((theme) => theme.media.tablet)} {
    padding-left: ${fromTheme((theme) => theme.spacing[4])};
  }
`;

export const ReviewTopRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${fromTheme((theme) => theme.spacing[8])};
`;

export const ReviewMetaBar = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${fromTheme((theme) => theme.spacing[6])};
  padding: ${fromTheme((theme) => `${theme.spacing[8]} ${theme.spacing[10]}`)};
  border: 1px solid ${fromTheme((theme) => theme.colors.border)};
  border-radius: ${fromTheme((theme) => theme.spacing[12])};
  background: linear-gradient(
    180deg,
    ${fromTheme((theme) => theme.colors.secondary)} 0%,
    ${fromTheme((theme) => theme.colors.background)} 100%
  );
  box-shadow: ${fromTheme((theme) => theme.shadows.shadow1)};
  min-width: fit-content;
`;

export const ReviewScoreValue = styled.span`
  font-size: ${fromTheme((theme) => theme.fontSizes[18])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.bold)};
  line-height: ${fromTheme((theme) => theme.lineHeights.tight)};
`;

export const ReviewMetaDivider = styled.span`
  width: 1px;
  height: 1.25rem;
  background: ${fromTheme((theme) => theme.colors.border)};
`;

export const ReviewDate = styled.span`
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
  font-size: ${fromTheme((theme) => theme.fontSizes[12])};
`;

export const ReviewMetaChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${fromTheme((theme) => `${theme.spacing[2]} ${theme.spacing[8]}`)};
  border-radius: 9999px;
  background: ${fromTheme((theme) => theme.colors.secondary)};
  color: ${fromTheme((theme) => theme.colors.mutedForeground)};
  font-size: ${fromTheme((theme) => theme.fontSizes[10])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.medium)};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const ReviewSourceChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${fromTheme((theme) => `${theme.spacing[2]} ${theme.spacing[8]}`)};
  border-radius: 9999px;
  background: ${fromTheme((theme) => theme.colors.foreground)};
  color: ${fromTheme((theme) => theme.colors.background)};
  font-size: ${fromTheme((theme) => theme.fontSizes[10])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.bold)};
  text-transform: uppercase;
  letter-spacing: 0;
`;

export const SteamRecommendationChip = styled.span<{ $recommended: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${fromTheme((theme) => theme.spacing[4])};
  padding: ${fromTheme((theme) => `${theme.spacing[2]} ${theme.spacing[8]}`)};
  border-radius: 9999px;
  background: ${({ theme, $recommended }) => ($recommended ? `${theme.colors.primary}1A` : `${theme.colors.destructive}1A`)};
  color: ${({ theme, $recommended }) => ($recommended ? theme.colors.primary : theme.colors.destructive)};
  font-size: ${fromTheme((theme) => theme.fontSizes[10])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.medium)};
  letter-spacing: 0;
`;

export const ReviewVoteWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
`;

export const EditReviewButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${fromTheme((theme) => theme.spacing[4])};
  padding: ${fromTheme((theme) => `${theme.spacing[6]} ${theme.spacing[10]}`)};
  border: 0;
  border-radius: 9999px;
  background: linear-gradient(
    180deg,
    ${fromTheme((theme) => theme.colors.primary)} 0%,
    ${fromTheme((theme) => theme.colors.primary)} 100%
  );
  color: ${fromTheme((theme) => theme.colors.primaryForeground)};
  font-size: ${fromTheme((theme) => theme.fontSizes[12])};
  font-weight: ${fromTheme((theme) => theme.fontWeights.bold)};
  box-shadow: 0 6px 14px rgba(34, 197, 94, 0.16);

  &:hover {
    filter: brightness(1.04);
  }
`;

export const ReviewText = styled.p`
  color: ${fromTheme((theme) => theme.colors.foreground)};
  font-size: ${fromTheme((theme) => theme.fontSizes[20])};
  line-height: ${fromTheme((theme) => theme.lineHeights.tall)};
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  max-width: 72rem;
`;

export const ReviewEditForm = styled.div`
  padding-top: ${fromTheme((theme) => theme.spacing[8])};
`;
