import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Page = styled.section`
  min-height: calc(100vh - ${({ theme }) => theme.spacing[64]});
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background:
    linear-gradient(135deg, ${({ theme }) => theme.colors.destructive}10, transparent 30rem),
    ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
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

export const HeaderBlock = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[16]};
  margin-bottom: ${({ theme }) => theme.spacing[24]};
`;

export const IconWrap = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.destructive}55;
  background: ${({ theme }) => theme.colors.destructive}14;
  color: ${({ theme }) => theme.colors.destructive};
`;

export const Eyebrow = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.destructive};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

export const Subtitle = styled.p`
  margin: ${({ theme }) => theme.spacing[8]} 0 0;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

export const CardsGrid = styled.div`
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

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  min-height: 16rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.mutedForeground};

  svg {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const EmptyState = styled.div`
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[12]};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[24]};
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
`;

export const EmptyTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[20]};
`;

export const EmptyText = styled.p`
  margin: 0;
  max-width: 26rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

export const ExploreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  min-height: 2.5rem;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[16]}`};
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ErrorState = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  border: 1px solid ${({ theme }) => theme.colors.destructive}66;
  border-radius: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[16]};
  background: ${({ theme }) => theme.colors.destructive}12;
  color: ${({ theme }) => theme.colors.destructive};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;
