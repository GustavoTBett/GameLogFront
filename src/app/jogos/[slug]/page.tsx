"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Gamepad2, Star, User } from "lucide-react";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { gamesAPI } from "@/lib/api";
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

  useEffect(() => {
    let isCancelled = false;

    const loadGame = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await gamesAPI.getBySlug(slug);
        if (!isCancelled) {
          setGame(data);
        }
      } catch (err) {
        if (!isCancelled) {
          const message = err instanceof Error ? err.message : "Falha ao carregar o jogo";
          setError(message);
          setGame(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    if (slug) {
      loadGame();
    }

    return () => {
      isCancelled = true;
    };
  }, [slug]);

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

              <S.MetricRow>
                <S.Metric>
                  <S.MetricLabel>Media de avaliacao</S.MetricLabel>
                  <S.MetricValue>
                    <Star size={16} style={{ display: "inline", marginRight: 6 }} />
                    {game.averageRating.toFixed(1)}
                  </S.MetricValue>
                </S.Metric>
                <S.Metric>
                  <S.MetricLabel>Slug</S.MetricLabel>
                  <S.MetricValue>{game.slug}</S.MetricValue>
                </S.Metric>
              </S.MetricRow>
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
                          <Star size={16} style={{ display: "inline", marginRight: 6 }} />
                          {review.score.toFixed(1)}
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
