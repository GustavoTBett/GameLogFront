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
