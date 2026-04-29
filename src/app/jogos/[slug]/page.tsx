"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Gamepad2, Star, User } from "lucide-react";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { RatingForm } from "@/components/features/ratings/RatingForm";
import { StarRating } from "@/components/features/ratings/StarRating";
import { gamesAPI, authAPI } from "@/lib/api";
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

export default function GameDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  const [game, setGame] = useState<GameDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUserResponse | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

  const loadGame = async (currentSlug: string, isCancelledRef: { current: boolean }) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await gamesAPI.getBySlug(currentSlug);
      if (!isCancelledRef.current) {
        setGame(data);
        // try to load current user (may 401 if not authenticated)
        try {
          const u = await authAPI.getCurrentUser();
          if (!isCancelledRef.current) setCurrentUser(u);
        } catch (e) {
          if (!isCancelledRef.current) setCurrentUser(null);
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
                <img src={game.coverUrl} alt={`Capa de ${game.name}`} loading="eager" />
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
            <S.Title>{game.name}</S.Title>
            <S.SubTitle>Informacoes completas do jogo e avaliacoes da comunidade.</S.SubTitle>

            <S.ChipRow>
              {game.genres.map((genre) => (
                <S.Chip key={genre}>{genre}</S.Chip>
              ))}
            </S.ChipRow>

            <S.Section>
              <S.SectionTitle>Descricoes</S.SectionTitle>
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
              <S.ReviewFormWrap>
                {currentUser ? (
                  (() => {
                    const userReview = game.reviews.find((r) => r.username === currentUser.username);
                    if (userReview) {
                      return (
                        <div>
                          <S.DetailCard>
                            <S.MetricRow>
                              <S.Metric>
                                <S.MetricLabel>Sua nota</S.MetricLabel>
                                <S.MetricValue>
                                  <StarRating rating={userReview.score} size="sm" showValue />
                                </S.MetricValue>
                              </S.Metric>
                              <S.Metric>
                                <S.MetricLabel>Data</S.MetricLabel>
                                <S.MetricValue>{formatReviewDate(userReview.createdAt)}</S.MetricValue>
                              </S.Metric>
                            </S.MetricRow>
                            <S.Paragraph style={{ marginTop: 12 }}>
                              <strong>{userReview.username}</strong>
                            </S.Paragraph>
                            <S.Paragraph>{userReview.review?.trim() ? userReview.review : "Sem comentario."}</S.Paragraph>
                            <div style={{ marginTop: 12 }}>
                              <button
                                type="button"
                                onClick={() => setEditingReviewId(userReview.id)}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: 8,
                                  background: "#0f9d58",
                                  color: "white",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                Editar avaliação
                              </button>
                            </div>
                          </S.DetailCard>

                          {editingReviewId === userReview.id ? (
                            <div style={{ marginTop: 12 }}>
                              <RatingForm
                                gameId={game.id}
                                editMode
                                ratingId={userReview.id}
                                initialScore={userReview.score}
                                initialReview={userReview.review ?? ""}
                                onSubmitted={() => {
                                  setEditingReviewId(null);
                                  refreshGame();
                                }}
                                onCancel={() => setEditingReviewId(null)}
                              />
                            </div>
                          ) : null}
                        </div>
                      );
                    }

                    // no user review -> show create form
                    return <RatingForm gameId={game.id} onSubmitted={refreshGame} />;
                  })()
                ) : (
                  <RatingForm gameId={game.id} onSubmitted={refreshGame} />
                )}
              </S.ReviewFormWrap>

              {game.reviews.length === 0 ? (
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
                game.reviews.map((review) => (
                  <S.DetailCard key={review.id} style={{ marginTop: "12px" }}>
                    <S.MetricRow>
                      <S.Metric>
                        <S.MetricLabel>Nota</S.MetricLabel>
                        <S.MetricValue>
                          <StarRating rating={review.score} size="sm" showValue />
                        </S.MetricValue>
                      </S.Metric>
                      <S.Metric>
                        <S.MetricLabel>Data</S.MetricLabel>
                        <S.MetricValue>{formatReviewDate(review.createdAt)}</S.MetricValue>
                      </S.Metric>
                    </S.MetricRow>

                    <S.Paragraph style={{ marginTop: "12px" }}>
                      <strong>{review.username}</strong>
                    </S.Paragraph>
                    <S.Paragraph>{review.review?.trim() ? review.review : "Sem comentario."}</S.Paragraph>
                  </S.DetailCard>
                ))
              )}
            </S.Section>
          </div>
        </S.Grid>
      </S.Container>

      <Footer />
    </S.Wrapper>
  );
}
