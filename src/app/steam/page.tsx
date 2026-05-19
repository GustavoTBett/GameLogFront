"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, Gamepad2, ShieldCheck, Sparkles } from "lucide-react";
import styled from "styled-components";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { PrivateRoute } from "@/components/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import { SteamIntegrationPanel } from "@/components/features/steam/SteamIntegrationPanel";

export default function SteamPage() {
  return (
    <>
      <Header />
      <PrivateRoute>
        <SteamContent />
      </PrivateRoute>
      <Footer />
    </>
  );
}

function SteamContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const linked = searchParams.get("steam") === "linked";

  return (
    <Page>
      <Container>
        <Hero>
          <Eyebrow>Steam</Eyebrow>
          <Title>Conecte sua biblioteca e acompanhe os jogos sincronizados</Title>
          <Subtitle>
            Vincule sua conta Steam para importar os jogos da biblioteca e atualizar os reviews públicos de cada título.
          </Subtitle>

          {user?.username ? <UserLine>Bem-vindo, {user.username}.</UserLine> : null}
        </Hero>

        {linked ? (
          <SuccessBanner>
            <CheckCircle2 size={18} />
            Conta Steam vinculada com sucesso. Agora use o painel abaixo para sincronizar os dados.
          </SuccessBanner>
        ) : null}

        <Grid>
          <MainColumn>
            <SteamIntegrationPanel showReviews />
          </MainColumn>

          <SideColumn>
            <InfoCard>
              <InfoTitle>
                <Sparkles size={18} />
                Como funciona
              </InfoTitle>
              <InfoList>
                <InfoItem>
                  <ShieldCheck size={16} />
                  <span>O vínculo usa a autenticação OpenID da Steam.</span>
                </InfoItem>
                <InfoItem>
                  <Gamepad2 size={16} />
                  <span>Após conectar, o backend sincroniza os jogos da biblioteca.</span>
                </InfoItem>
                <InfoItem>
                  <Sparkles size={16} />
                  <span>Os reviews públicos importados aparecem no painel principal.</span>
                </InfoItem>
              </InfoList>
            </InfoCard>
          </SideColumn>
        </Grid>
      </Container>
    </Page>
  );
}

const Page = styled.section`
  min-height: calc(100vh - ${({ theme }) => theme.spacing[64]});
  background:
    radial-gradient(circle at top left, ${({ theme }) => theme.colors.primary}18 0, transparent 28rem),
    ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[24]} ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[40]};

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.spacing[32]} ${({ theme }) => theme.spacing[24]} ${({ theme }) => theme.spacing[48]};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.spacing[48]} ${({ theme }) => theme.spacing[32]} ${({ theme }) => theme.spacing[48]};
  }
`;

const Hero = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[20]};
`;

const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  max-width: 48rem;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  letter-spacing: -0.03em;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[48]};
  }
`;

const Subtitle = styled.p`
  max-width: 46rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: ${({ theme }) => theme.lineHeights.normal};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[18]};
  }
`;

const UserLine = styled.p`
  margin: ${({ theme }) => theme.spacing[8]} 0 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const SuccessBanner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[20]};
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[16]}`};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}44`};
  border-radius: ${({ theme }) => theme.spacing[10]};
  background: ${({ theme }) => `${theme.colors.primary}12`};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing[20]};

  ${({ theme }) => theme.media.laptop} {
    grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.7fr);
  }
`;

const MainColumn = styled.div`
  min-width: 0;
`;

const SideColumn = styled.aside`
  min-width: 0;
`;

const InfoCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[12]};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  padding: ${({ theme }) => theme.spacing[20]};
`;

const InfoTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  margin: 0 0 ${({ theme }) => theme.spacing[16]};
  font-size: ${({ theme }) => theme.fontSizes[20]};
`;

const InfoList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[12]};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[10]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: ${({ theme }) => theme.lineHeights.normal};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.1rem;
    flex-shrink: 0;
  }
`;
