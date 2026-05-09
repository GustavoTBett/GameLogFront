"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Gamepad2, Heart, Loader2, PenLine, Star, User } from "lucide-react";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { RatingForm } from "@/components/features/ratings/RatingForm";
import { ReviewVoteControls } from "@/components/features/ratings/ReviewVoteControls";
import { gamesAPI, authAPI, favoritesAPI } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { AuthUserResponse } from "@/types/auth";
import { GameDetail } from "@/types/game";
import * as S from "./GameDetail.styled";

function formatDate(date: string | null): string {
  if (!date) return "Sem data";
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

function formatReviewDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Data indisponivel";
  }

  return parsed.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatReviewUpdatedDate(createdAt: string, updatedAt?: string | null): string {
  if (!updatedAt || updatedAt === createdAt) {
    return formatReviewDate(createdAt);
  }

  return formatReviewDate(updatedAt);
}

export default function GameDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  const [game, setGame] = useState<GameDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUserResponse | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const currentUserReview = useMemo(() => {
    if (!game || !currentUser) {
      return null;
    }

    return game.reviews.find((review) => review.username === currentUser.username) ?? null;
  }, [currentUser, game]);

  const reviewsToRender = useMemo(() => {
    if (!game) {
      return [];
    }

    if (!currentUserReview) {
      return game.reviews;
    }

    return [currentUserReview, ...game.reviews.filter((review) => review.id !== currentUserReview.id)];
  }, [currentUserReview, game]);

  const loadGame = async (currentSlug: string, isCancelledRef: { current: boolean }) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await gamesAPI.getBySlug(currentSlug);
      if (!isCancelledRef.current) {
        setGame(data);
        setIsFavorite(false);
        // try to load current user (may 401 if not authenticated)
        try {
          const u = await authAPI.getCurrentUser();
          if (!isCancelledRef.current) {
            setCurrentUser(u);
            try {
              const status = await favoritesAPI.getStatus(data.id);
              if (!isCancelledRef.current) {
                setIsFavorite(status.favorite);
              }
            } catch {
              if (!isCancelledRef.current) {
                setIsFavorite(false);
              }
            }
          }
        } catch {
          if (!isCancelledRef.current) {
            setCurrentUser(null);
            setIsFavorite(false);
          }
        }
      }
    } catch (err) {
      if (!isCancelledRef.current) {
        const message = err instanceof Error ? err.message : "Falha ao carregar o jogo";
        setError(message);
        setGame(null);
      }
    } finally {
      if (!isCancelledRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const isCancelledRef = { current: false };

    if (slug) {
      loadGame(slug, isCancelledRef);
    }

    return () => {
      isCancelledRef.current = true;
    };
  }, [slug]);

  const refreshGame = async () => {
    if (!slug) return;
    await loadGame(slug, { current: false });
  };

  const handleToggleFavorite = async () => {
    if (!game) {
      return;
    }

    if (!currentUser) {
      router.push("/login");
      return;
    }

    setIsFavoriteLoading(true);

    try {
      if (isFavorite) {
        await favoritesAPI.unfavorite(game.id);
        setIsFavorite(false);
        toast({
          title: "Removido dos favoritos",
          description: `${game.name} saiu da sua lista.`,
          duration: 3500,
        });
      } else {
        const status = await favoritesAPI.favorite(game.id);
        setIsFavorite(status.favorite);
        toast({
          title: "Adicionado aos favoritos",
          description: `${game.name} entrou na sua lista.`,
          duration: 3500,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel atualizar favorito";
      toast({
        title: "Erro ao favoritar",
        description: message,
        variant: "destructive",
        duration: 4500,
      });
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  if (isLoading) {
    return (
      <S.Wrapper>
        <Header />
        <S.Container>
          <S.SubTitle>Carregando detalhes do jogo...</S.SubTitle>
        </S.Container>
        <Footer />
      </S.Wrapper>
    );
  }

  if (error || !game) {
    return (
      <S.Wrapper>
        <Header />
        <S.Container>
          <S.BackLink href="/jogos">
            <ArrowLeft size={16} />
            Voltar para jogos
          </S.BackLink>
          <S.Section>
            <S.SectionTitle>Jogo nao encontrado</S.SectionTitle>
            <S.Paragraph>{error ?? "O jogo solicitado nao pode ser localizado."}</S.Paragraph>
            <button onClick={() => router.push("/jogos")}>Voltar para a listagem</button>
          </S.Section>
        </S.Container>
        <Footer />
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <Header />

      <S.Container>
        <S.BackLink href="/jogos">
          <ArrowLeft size={16} />
          Voltar para jogos
        </S.BackLink>

        <S.Grid>
          <S.Card>
            <S.Cover>
              {game.coverUrl ? (
                <Image
                  src={game.coverUrl}
                  alt={`Capa de ${game.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              ) : (
                <S.CoverFallback>
                  <Gamepad2 size={48} />
                </S.CoverFallback>
              )}
            </S.Cover>

            <S.CardBody>
              <S.ChipRow>
                <S.Chip>{formatDate(game.releaseDate)}</S.Chip>
                <S.Chip>{game.developer ?? "Desenvolvedor nao informado"}</S.Chip>
                <S.Chip>{game.totalReviews} avaliacoes</S.Chip>
              </S.ChipRow>

              <S.MetricRowThree>
                <S.Metric>
                  <S.MetricLabel>Media de avaliacao</S.MetricLabel>
                  <S.MetricValue>
                    <Star size={16} style={{ display: "inline", marginRight: 6 }} />
                    {game.averageRating.toFixed(1)}
                  </S.MetricValue>
                </S.Metric>
                <S.Metric>
                  <S.MetricLabel>Nota externa</S.MetricLabel>
                  <S.MetricValue>
                    <Star size={16} style={{ display: "inline", marginRight: 6 }} />
                    {typeof game.defaultRating === "number" ? game.defaultRating.toFixed(1) : "Sem nota"}
                  </S.MetricValue>
                </S.Metric>
                <S.Metric>
                  <S.MetricLabel>Slug</S.MetricLabel>
                  <S.MetricValue>{game.slug}</S.MetricValue>
                </S.Metric>
              </S.MetricRowThree>
            </S.CardBody>
          </S.Card>

          <div>
            <S.TitleRow>
              <S.Title>{game.name}</S.Title>
              <S.FavoriteButton
                type="button"
                $active={isFavorite}
                aria-pressed={isFavorite}
                onClick={handleToggleFavorite}
                disabled={isFavoriteLoading}
              >
                {isFavoriteLoading ? (
                  <Loader2 size={18} className="spin" />
                ) : (
                  <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                )}
                {isFavorite ? "Favoritado" : currentUser ? "Favoritar" : "Entrar para favoritar"}
              </S.FavoriteButton>
            </S.TitleRow>
            <S.SubTitle>Informacoes completas do jogo e avaliações da comunidade.</S.SubTitle>

            <S.ChipRow>
              {game.genres.map((genre) => (
                <S.Chip key={genre}>{genre}</S.Chip>
              ))}
            </S.ChipRow>

            <S.Section>
              <S.SectionTitle>Descrições</S.SectionTitle>
              <S.DescriptionGrid>
                <S.DescriptionColumn>
                  <S.DescriptionColumnTitle>Descricao (EN)</S.DescriptionColumnTitle>
                  <S.Paragraph>{game.description ?? "Descricao em ingles nao informada."}</S.Paragraph>
                </S.DescriptionColumn>

                <S.DescriptionColumn>
                  <S.DescriptionColumnTitle>Descricao (PT-BR)</S.DescriptionColumnTitle>
                  <S.Paragraph>{game.descriptionPtBr ?? "Descricao em portugues nao informada."}</S.Paragraph>
                </S.DescriptionColumn>
              </S.DescriptionGrid>
            </S.Section>

            <S.Section>
              <S.SectionTitle>Avaliacoes da comunidade</S.SectionTitle>
              {!currentUserReview ? (
                <S.ReviewFormWrap>
                  <RatingForm gameId={game.id} onSubmitted={refreshGame} />
                </S.ReviewFormWrap>
              ) : null}

              {reviewsToRender.length === 0 ? (
                <S.EmptyState>
                  <S.EmptyIcon>
                    <User size={18} />
                  </S.EmptyIcon>
                  <div>
                    <strong>Nenhuma avaliacao publicada ainda</strong>
                    <p>Esse jogo ainda nao recebeu avaliacoes de usuarios.</p>
                  </div>
                </S.EmptyState>
              ) : (
                <S.ReviewList>
                  {reviewsToRender.map((review) => {
                    const isOwnReview = currentUser?.username === review.username;
                    const isEdited = review.updatedAt && review.updatedAt !== review.createdAt;

                    return (
                      <div key={review.id}>
                        <S.ReviewCard>
                          <S.ReviewAvatarColumn>
                            <S.ReviewAvatar>
                              <User size={34} />
                            </S.ReviewAvatar>
                            <S.ReviewUsername>{review.username}</S.ReviewUsername>
                          </S.ReviewAvatarColumn>

                          <S.ReviewContentColumn>
                            <S.ReviewTopRow>
                              <S.ReviewMetaBar>
                                <S.ReviewScoreValue>{review.score}</S.ReviewScoreValue>
                                <S.ReviewMetaDivider />
                                <S.ReviewDate>{formatReviewUpdatedDate(review.createdAt, review.updatedAt)}</S.ReviewDate>
                                {isEdited ? <S.ReviewMetaChip>editada</S.ReviewMetaChip> : null}
                              </S.ReviewMetaBar>

                              {isOwnReview ? (
                                <S.EditReviewButton type="button" onClick={() => setEditingReviewId(review.id)}>
                                  <PenLine size={16} />
                                  Editar avaliação
                                </S.EditReviewButton>
                              ) : (
                                <S.ReviewVoteWrap>
                                  <ReviewVoteControls
                                    ratingId={review.id}
                                    upvoteCount={review.upvoteCount}
                                    downvoteCount={review.downvoteCount}
                                    userVote={review.userVote ?? null}
                                    isAuthenticated={Boolean(currentUser)}
                                    isOwnReview={false}
                                  />
                                </S.ReviewVoteWrap>
                              )}
                            </S.ReviewTopRow>

                            <S.ReviewText>{review.review?.trim() ? review.review : "Sem comentario."}</S.ReviewText>
                          </S.ReviewContentColumn>
                        </S.ReviewCard>

                        {editingReviewId === review.id ? (
                          <S.ReviewEditForm>
                            <RatingForm
                              gameId={game.id}
                              editMode
                              ratingId={review.id}
                              initialScore={review.score}
                              initialReview={review.review ?? ""}
                              onSubmitted={() => {
                                setEditingReviewId(null);
                                refreshGame();
                              }}
                              onCancel={() => setEditingReviewId(null)}
                            />
                          </S.ReviewEditForm>
                        ) : null}
                      </div>
                    );
                  })}
                </S.ReviewList>
              )}
            </S.Section>
          </div>
        </S.Grid>
      </S.Container>

      <Footer />
    </S.Wrapper>
  );
}
