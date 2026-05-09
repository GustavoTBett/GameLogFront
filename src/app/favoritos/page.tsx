"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Heart, Loader2, Search } from "lucide-react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { PrivateRoute } from "@/components/PrivateRoute";
import { GameCard } from "@/components/features/games/GameCard";
import { favoritesAPI } from "@/lib/api";
import type { GameSummary } from "@/types/game";
import * as S from "./FavoritesPage.styled";

export default function FavoritesPage() {
  return (
    <S.Wrapper>
      <Header />
      <PrivateRoute>
        <FavoritesContent />
      </PrivateRoute>
      <Footer />
    </S.Wrapper>
  );
}

function FavoritesContent() {
  const [games, setGames] = useState<GameSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function loadFavorites() {
      setIsLoading(true);
      setError("");

      try {
        const data = await favoritesAPI.getMine();
        if (!isCancelled) {
          setGames(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Erro ao carregar favoritos");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <S.Page>
      <S.Container>
        <S.HeaderBlock>
          <S.IconWrap>
            <Heart size={26} fill="currentColor" />
          </S.IconWrap>
          <div>
            <S.Eyebrow>Favoritos</S.Eyebrow>
            <S.Title>Minha lista de jogos</S.Title>
            <S.Subtitle>Jogos que voce marcou para acompanhar de perto.</S.Subtitle>
          </div>
        </S.HeaderBlock>

        {error ? <S.ErrorState>{error}</S.ErrorState> : null}

        {isLoading ? (
          <S.LoadingState>
            <Loader2 size={20} />
            Carregando favoritos...
          </S.LoadingState>
        ) : games.length === 0 && !error ? (
          <S.EmptyState>
            <S.EmptyIcon>
              <Search size={22} />
            </S.EmptyIcon>
            <S.EmptyTitle>Nenhum favorito ainda</S.EmptyTitle>
            <S.EmptyText>Abra um jogo e use o coracao para guardar ele aqui.</S.EmptyText>
            <S.ExploreLink href="/jogos">
              Explorar jogos
              <ArrowRight size={16} />
            </S.ExploreLink>
          </S.EmptyState>
        ) : (
          <S.CardsGrid>
            {games.map((game) => (
              <GameCard key={game.id} game={game} href={`/jogos/${game.slug}`} />
            ))}
          </S.CardsGrid>
        )}
      </S.Container>
    </S.Page>
  );
}
