"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Clock3, ExternalLink, Gamepad2, Loader2, MessageSquare, RefreshCcw, ShieldCheck, ThumbsDown, ThumbsUp } from "lucide-react";
import styled, { css } from "styled-components";
import { toast } from "@/hooks/use-toast";
import { steamAPI } from "@/lib/api";
import type { SteamAccountResponse, SteamUserReviewResponse } from "@/types/steam";

interface SteamIntegrationPanelProps {
  compact?: boolean;
  showReviews?: boolean;
  className?: string;
}

function formatDateTime(value: string | null): string {
  if (!value) {
    return "Nunca";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function SteamIntegrationPanel({ compact = false, showReviews = false, className }: SteamIntegrationPanelProps) {
  const [account, setAccount] = useState<SteamAccountResponse | null>(null);
  const [reviews, setReviews] = useState<SteamUserReviewResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshSteamData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const accountData = await steamAPI.getMyAccount();
      setAccount(accountData);

      if (showReviews && accountData.linked) {
        const reviewData = await steamAPI.getMyReviews();
        setReviews(reviewData);
      } else {
        setReviews([]);
      }
    } catch (requestError) {
      setAccount(null);
      setReviews([]);
      setError(getErrorMessage(requestError, "Não foi possível carregar a integração Steam."));
    } finally {
      setIsLoading(false);
    }
  }, [showReviews]);

  useEffect(() => {
    void refreshSteamData();
  }, [refreshSteamData]);

  const handleConnect = () => {
    window.location.assign(steamAPI.connectUrl());
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setError(null);

    try {
      const summary = await steamAPI.syncMyAccount();
      await refreshSteamData();
      toast({
        title: "Steam sincronizada",
        description: `${summary.savedReviews} reviews atualizadas e ${summary.importedGames} jogos importados.`,
        duration: 4000,
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Não foi possível sincronizar a conta Steam."));
    } finally {
      setIsSyncing(false);
    }
  };

  const linked = Boolean(account?.linked);
  const synced = Boolean(account?.synced);
  const activeReviews = reviews.filter((review) => review.active !== false);
  const reviewCount = activeReviews.length;
  const canSync = linked && !isLoading && !isSyncing;

  return (
    <Panel $compact={compact} className={className}>
      <PanelHeader>
        <HeaderCopy>
          <Eyebrow>Steam</Eyebrow>
          <Title>{compact ? "Integração Steam" : "Sua conta Steam"}</Title>
          <Subtitle>
            {compact
              ? "Conecte sua biblioteca Steam e sincronize os jogos vinculados à sua conta."
              : "Conecte sua biblioteca Steam para importar os jogos que você possui e acompanhar os reviews públicos."}
          </Subtitle>
        </HeaderCopy>

        <StatusBadge $active={linked} $synced={synced}>
          {linked ? (synced ? <ShieldCheck size={14} /> : <Clock3 size={14} />) : <AlertTriangle size={14} />}
          {linked ? (synced ? "Sincronizada" : "Vinculada") : "Não vinculada"}
        </StatusBadge>
      </PanelHeader>

      {error ? (
        <ErrorBox>
          <strong>Erro</strong>
          <span>{error}</span>
          <SecondaryButton type="button" onClick={() => void refreshSteamData()}>
            Tentar novamente
          </SecondaryButton>
        </ErrorBox>
      ) : null}

      {isLoading ? (
        <LoadingState>
          <Loader2 size={18} />
          Carregando integração Steam...
        </LoadingState>
      ) : linked ? (
        <Body>
          {!compact ? (
            <StatsGrid>
              <StatCard>
                <StatLabel>Conta</StatLabel>
                <StatValue>{account?.steamId ?? "—"}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Último sync</StatLabel>
                <StatValue>{formatDateTime(account?.lastSyncedAt ?? null)}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Jogos importados</StatLabel>
                <StatValue>{reviewCount}</StatValue>
              </StatCard>
            </StatsGrid>
          ) : null}

          <InfoList>
            <InfoItem>
              <InfoLabel>Steam ID</InfoLabel>
              <InfoValue>{account?.steamId ?? "—"}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Perfil público</InfoLabel>
              {account?.profileUrl ? (
                <ProfileLink href={account.profileUrl} target="_blank" rel="noreferrer">
                  Abrir perfil <ExternalLink size={14} />
                </ProfileLink>
              ) : (
                <InfoValue>—</InfoValue>
              )}
            </InfoItem>
            <InfoItem>
              <InfoLabel>Sincronização</InfoLabel>
              <InfoValue>{synced ? "Em dia" : "Pendente"}</InfoValue>
            </InfoItem>
          </InfoList>

          <ActionRow>
            <PrimaryButton type="button" onClick={() => void handleSync()} disabled={!canSync}>
              {isSyncing ? <Loader2 size={16} className="spin" /> : <RefreshCcw size={16} />}
              {isSyncing ? "Sincronizando" : "Sincronizar agora"}
            </PrimaryButton>

            {compact ? (
              <SecondaryButton as={Link} href="/steam">
                Ver painel completo
              </SecondaryButton>
            ) : account?.profileUrl ? (
              <SecondaryButton as="a" href={account.profileUrl} target="_blank" rel="noreferrer">
                Abrir Steam
              </SecondaryButton>
            ) : null}
          </ActionRow>

          {showReviews ? (
            <ReviewsSection>
              <SectionHeader>
                <SectionTitle>Reviews sincronizadas</SectionTitle>
                <SectionSubtitle>{reviewCount} reviews públicas ativas</SectionSubtitle>
              </SectionHeader>

              {activeReviews.length > 0 ? (
                <ReviewsGrid>
                  {activeReviews.map((review) => (
                    <ReviewCard key={review.appId}>
                      <ReviewCover>
                        {review.coverUrl ? (
                          <img
                            src={review.coverUrl}
                            alt={`Capa de ${review.gameName ?? "jogo Steam"}`}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <ReviewFallback>
                            <Gamepad2 size={18} />
                            <span>{review.gameName ?? "Jogo Steam"}</span>
                          </ReviewFallback>
                        )}
                      </ReviewCover>

                      <ReviewBody>
                        {review.gameSlug ? (
                          <ReviewTitle as={Link} href={`/jogos/${review.gameSlug}`}>
                            {review.gameName ?? "Jogo sem nome"}
                          </ReviewTitle>
                        ) : (
                          <ReviewTitle>{review.gameName ?? "Jogo sem nome"}</ReviewTitle>
                        )}

                        <ReviewMeta>
                          <MetaBadge>
                            {review.recommended ? <ThumbsUp size={12} /> : <ThumbsDown size={12} />}
                            {review.recommended ? "Recomendada" : "Não recomendada"}
                          </MetaBadge>
                          <MetaBadge>
                            <Clock3 size={12} />
                            {formatDateTime(review.reviewedAt ?? review.importedAt)}
                          </MetaBadge>
                          {review.language ? <MetaBadge>{review.language}</MetaBadge> : null}
                        </ReviewMeta>

                        {review.reviewText ? (
                          <ReviewExcerpt>
                            <MessageSquare size={14} />
                            <span>{review.reviewText}</span>
                          </ReviewExcerpt>
                        ) : null}
                      </ReviewBody>
                    </ReviewCard>
                  ))}
                </ReviewsGrid>
              ) : (
                <EmptyState>
                  Nenhuma review pública ativa sincronizada ainda. Use o botão acima para buscar os dados da Steam.
                </EmptyState>
              )}
            </ReviewsSection>
          ) : null}
        </Body>
      ) : (
        <Body>
          <ConnectCopy>
            <strong>Vincule sua Steam para liberar a sincronização.</strong>
            <span>
              Depois da autorização, o painel poderá importar os jogos da biblioteca e atualizar os reviews públicos.
            </span>
          </ConnectCopy>

          <ActionRow>
            <PrimaryButton type="button" onClick={handleConnect}>
              <Gamepad2 size={16} />
              Conectar Steam
            </PrimaryButton>

            {compact ? (
              <SecondaryButton as={Link} href="/steam">
                Abrir painel completo
              </SecondaryButton>
            ) : null}
          </ActionRow>

          <HintBox>
            <ShieldCheck size={16} />
            Perfis privados podem impedir a sincronização completa das reviews.
          </HintBox>
        </Body>
      )}
    </Panel>
  );
}

const Panel = styled.section<{ $compact: boolean }>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[12]};
  background:
    linear-gradient(135deg, ${({ theme }) => theme.colors.primary}12 0%, transparent 40%),
    ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  padding: ${({ theme, $compact }) => ($compact ? theme.spacing[16] : theme.spacing[24])};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
`;

const PanelHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[12]};
`;

const HeaderCopy = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[20]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const Subtitle = styled.p`
  margin: ${({ theme }) => theme.spacing[8]} 0 0;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

const StatusBadge = styled.span<{ $active: boolean; $synced: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[10]}`};
  border-radius: 999px;
  border: 1px solid
    ${({ theme, $active, $synced }) =>
      !$active ? theme.colors.border : $synced ? `${theme.colors.primary}44` : `${theme.colors.destructive}44`};
  background: ${({ theme, $active, $synced }) =>
    !$active ? theme.colors.secondary : $synced ? `${theme.colors.primary}12` : `${theme.colors.destructive}12`};
  color: ${({ theme, $active, $synced }) =>
    !$active ? theme.colors.mutedForeground : $synced ? theme.colors.primary : theme.colors.destructive};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[10]};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[10]};
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing[12]};
`;

const StatLabel = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;

const StatValue = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const InfoList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[10]};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[12]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[10]};
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[12]}`};
`;

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  flex-shrink: 0;
`;

const InfoValue = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  text-align: right;
`;

const ProfileLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};

  ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const actionButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  min-height: 2.75rem;
  padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[16]}`};
  border-radius: ${({ theme }) => theme.spacing[8]};
  border: 1px solid transparent;
  text-decoration: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: transform 0.2s ease, filter 0.2s ease, border-color 0.2s ease;

  svg.spin {
    animation: spin 0.9s linear infinite;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const PrimaryButton = styled.button`
  ${actionButtonStyles};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};

  &:hover:not(:disabled) {
    filter: brightness(0.97);
  }
`;

const SecondaryButton = styled.button`
  ${actionButtonStyles};
  background: ${({ theme }) => theme.colors.card};
  border-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => `${theme.colors.destructive}55`};
  border-left: 4px solid ${({ theme }) => theme.colors.destructive};
  border-radius: ${({ theme }) => theme.spacing[10]};
  background: ${({ theme }) => `${theme.colors.destructive}10`};
  padding: ${({ theme }) => theme.spacing[12]};
  color: ${({ theme }) => theme.colors.foreground};

  strong {
    color: ${({ theme }) => theme.colors.destructive};
  }
`;

const LoadingState = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};

  svg {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ConnectCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: ${({ theme }) => theme.lineHeights.normal};

  strong {
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }

  span {
    color: ${({ theme }) => theme.colors.mutedForeground};
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;

const HintBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;

const ReviewsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[8]};
  flex-wrap: wrap;
`;

const SectionTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[16]};
`;

const SectionSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[12]};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ReviewCard = styled.article`
  display: flex;
  gap: ${({ theme }) => theme.spacing[12]};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[10]};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const ReviewCover = styled.div`
  width: 6rem;
  min-height: 6rem;
  flex-shrink: 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ReviewFallback = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[10]};
  text-align: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ReviewBody = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[12]} 0;
`;

const ReviewTitle = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ReviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const ReviewExcerpt = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  line-height: ${({ theme }) => theme.lineHeights.normal};

  span {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const MetaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondaryForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;

const EmptyState = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[10]};
  padding: ${({ theme }) => theme.spacing[16]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  text-align: center;
`;
