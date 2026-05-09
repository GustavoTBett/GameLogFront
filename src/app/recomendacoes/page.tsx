'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import { useRecommendations } from '@/hooks/useRecommendations';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function formatDate(date: string | null): string {
  if (!date) {
    return 'Sem data';
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR');
}

interface GameCoverProps {
  src: string | null;
  alt: string;
  title: string;
  subtitle?: string;
  height: string;
}

function GameCover({ src, alt, title, subtitle = 'Capa indisponível', height }: GameCoverProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <CoverFrame $height={height}>
      {src && !hasError ? (
        <CoverImage
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : (
        <CoverPlaceholder>
          <span>🎮</span>
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </CoverPlaceholder>
      )}
    </CoverFrame>
  );
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeaderSection = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.foreground};
  }

  p {
    color: ${({ theme }) => theme.colors.mutedForeground};
    font-size: 1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RecommendationCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const CoverFrame = styled.div<{ $height: string }>`
  width: 100%;
  height: ${({ $height }) => $height};
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.muted} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CoverPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedForeground};

  span:first-child {
    font-size: 1.75rem;
    line-height: 1;
  }

  strong {
    color: ${({ theme }) => theme.colors.foreground};
    font-size: ${({ theme }) => theme.fontSizes[14]};
    line-height: 1.2;
  }

  span:last-child {
    font-size: ${({ theme }) => theme.fontSizes[12]};
  }
`;

const GameInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.foreground};
`;

const GameDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const GameMetaPair = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
`;

const RatingBadge = styled.div<{ $muted?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  background: ${({ theme, $muted }) => ($muted ? theme.colors.secondary : theme.colors.primary)};
  color: ${({ theme, $muted }) => ($muted ? theme.colors.mutedForeground : theme.colors.primaryForeground)};
  border: 1px solid ${({ theme, $muted }) => ($muted ? theme.colors.border : theme.colors.primary)};
  font-weight: 700;
  font-size: 0.9rem;
  white-space: nowrap;
  flex-shrink: 0;
`;

const DateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondaryForeground};
  font-weight: 600;
  font-size: 0.85rem;
  white-space: nowrap;
  flex-shrink: 0;
`;

const ImportedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.7rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`;

const ReasonBox = styled.div`
  background: ${({ theme }) => theme.colors.muted};
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.foreground};

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    margin: 0.5rem 0 0;
    color: inherit;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;

  button {
    flex: 1;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
  background: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.foreground};
  }

  p {
    font-size: 0.9rem;
    margin: 0;
    color: inherit;
  }
`;

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.foreground};
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${({ theme }) => theme.colors.destructive};

  strong {
    color: ${({ theme }) => theme.colors.destructive};
  }
`;

const ErrorAlertMessage = styled.div`
  min-width: 0;
  flex: 1 1 16rem;
`;

const GenerateRecommendationButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primary}dd 100%);
  color: ${({ theme }) => theme.colors.primaryForeground};
  box-shadow: ${({ theme }) => theme.shadows.shadow3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.01em;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }

  &:disabled {
    opacity: 0.7;
    box-shadow: none;
  }
`;

const HowWorksTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const HowWorksCard = styled(Card)`
  color: ${({ theme }) => theme.colors.foreground};
`;

const HowWorksContent = styled.div`
  padding: 1.5rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.mutedForeground};

  p {
    color: inherit;
    margin: 0 0 1rem;
  }
`;

const HowWorksStepTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

function RecommendationsContent() {
  const router = useRouter();
  const { recommendation, loading, error, generateRecommendation, clearError } =
    useRecommendations();

  const handleViewGame = (slug: string | null) => {
    if (slug) {
      router.push(`/jogos/${slug}`);
    }
  };

  const recommendationScore =
    recommendation && recommendation.averageRating > 0
      ? recommendation.averageRating
      : recommendation && typeof recommendation.defaultRating === "number" && recommendation.defaultRating > 0
        ? recommendation.defaultRating
        : null;

  function formatRecommendationScore(score: number | null): string {
    if (typeof score !== "number" || Number.isNaN(score) || score <= 0) {
      return "Sem nota";
    }

    return score.toFixed(1);
  }

  return (
    <>
      <Header />
      <PageContainer>
        <HeaderSection>
          <h1>🎮 Minhas Recomendações</h1>
          <p>Descubra novos jogos baseado no seu histórico de avaliações</p>
        </HeaderSection>

      {error && (
        <ErrorAlert>
          <ErrorAlertMessage>
            <strong>Erro:</strong> {error}
          </ErrorAlertMessage>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearError}
          >
            Descartar
          </Button>
        </ErrorAlert>
      )}

      <ContentGrid>
        {/* Coluna de Recomendação */}
        <div>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Recomendação Atual</h2>

          {recommendation ? (
            <RecommendationCard>
              <GameCover
                key={recommendation.coverUrl ?? recommendation.gameName}
                src={recommendation.coverUrl}
                alt={recommendation.gameName}
                title={recommendation.gameName}
                height="250px"
              />

              <CardContent style={{ padding: '1.5rem' }}>
                <GameInfo>
                  <GameName>{recommendation.gameName}</GameName>

                  <GameDetails>
                    <GameMetaPair>
                      <RatingBadge $muted={recommendationScore === null}>
                        ⭐ {formatRecommendationScore(recommendationScore)}
                      </RatingBadge>
                      <DateBadge>📅 {formatDate(recommendation.releaseDate ?? null)}</DateBadge>
                    </GameMetaPair>
                  </GameDetails>

                  {recommendation.isNewlyImported ? <ImportedBadge>🆕 Novo</ImportedBadge> : null}

                  <ReasonBox>
                    <strong>Por que você vai gostar:</strong>
                    <p>{recommendation.reason}</p>
                  </ReasonBox>

                  <ActionButtons>
                    {recommendation.gameSlug && (
                      <Button
                        onClick={() => handleViewGame(recommendation.gameSlug)}
                      >
                        Ver Detalhes
                      </Button>
                    )}
                    <Button
                      onClick={generateRecommendation}
                      disabled={loading}
                      variant="outline"
                    >
                      {loading ? <LoadingSpinner /> : '↻ Outra'}
                    </Button>
                  </ActionButtons>
                </GameInfo>
              </CardContent>
            </RecommendationCard>
          ) : (
            <Card>
              <CardContent style={{ padding: '2rem' }}>
                <EmptyState>
                  <h3>Sem recomendação atual</h3>
                  <p>Clique em &quot;Gerar Recomendação&quot; para receber uma sugestão personalizada</p>
                </EmptyState>
              </CardContent>
            </Card>
          )}

          <GenerateRecommendationButton
            onClick={generateRecommendation}
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <>
                <LoadingSpinner style={{ marginRight: '0.5rem' }} />
                Gerando recomendação...
              </>
            ) : (
              '🎲 Gerar Recomendação'
            )}
          </GenerateRecommendationButton>

        </div>

        {/* Coluna de Informações */}
        <div>
          <HowWorksTitle>Como Funciona</HowWorksTitle>
          <HowWorksCard>
            <HowWorksContent>
              <HowWorksStepTitle>🔄 Algoritmo Inteligente</HowWorksStepTitle>
              <p>
                Nosso sistema analisa seus ratings e preferências para recomendar jogos que você provavelmente vai adorar.
              </p>

              <HowWorksStepTitle>📊 Baseado em Seus Dados</HowWorksStepTitle>
              <p>
                Consideramos gêneros preferidos, plataformas, desenvolvedoras e sua nota média para personalizar as sugestões.
              </p>

              <HowWorksStepTitle>🤖 Alimentado por IA</HowWorksStepTitle>
              <p>
                Usamos inteligência artificial para entender padrões em seus gostos e fazer recomendações mais relevantes.
              </p>

              <HowWorksStepTitle>🚀 Sempre Novo</HowWorksStepTitle>
              <p>
                Cada clique gera uma nova recomendação. Quanto mais você avalia, melhores ficam as sugestões!
              </p>
            </HowWorksContent>
          </HowWorksCard>
        </div>
      </ContentGrid>
      </PageContainer>
      <Footer />
    </>
  );
}

export default function RecommendationsPage() {
  return (
    <PrivateRoute>
      <RecommendationsContent />
    </PrivateRoute>
  );
}
