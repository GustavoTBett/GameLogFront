"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Gamepad2, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { GameCard } from "@/components/game-card/GameCard";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { mockGames, favoriteGameIds } from "@/lib/mock-data";
import * as S from "./Home.styled";

export default function HomeClient() {
  const [favorites, setFavorites] = useState<string[]>(favoriteGameIds);

  const toggleFavorite = (gameId: string) => {
    setFavorites((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const popularGames = [...mockGames]
    .sort((a, b) => b.totalReviews - a.totalReviews)
    .slice(0, 6);

  const topRatedGames = [...mockGames]
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);

  return (
    <S.PageWrapper>
      <Header />

      <S.HeroSection>
        <div className="gradient-bg" />
        <S.Container>
          <S.HeroContent>
            <h1>
              Descubra, Avalie e Compartilhe
              <span> Jogos</span>
            </h1>
            <p>
              Sua plataforma para avaliar jogos, descobrir novos títulos e receber 
              recomendações personalizadas baseadas nas suas preferências.
            </p>
            <S.ButtonGroup>
              <Button asChild size="lg">
                <Link href="/games">
                  Explorar Jogos
                  <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline">
                <Link href="/register">
                  Criar Conta
                </Link>
              </Button>
            </S.ButtonGroup>
          </S.HeroContent>

          <S.StatsGrid>
            {[
              { icon: Gamepad2, label: "Jogos", value: "500+" },
              { icon: Users, label: "Usuários", value: "10K+" },
              { icon: Star, label: "Avaliações", value: "50K+" },
              { icon: TrendingUp, label: "Recomendações", value: "100K+" },
            ].map((stat) => (
              <S.StatCard key={stat.label}>
                <stat.icon size={32} />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </S.StatCard>
            ))}
          </S.StatsGrid>
        </S.Container>
      </S.HeroSection>

      <S.Section>
        <S.Container>
          <S.SectionHeader>
            <div>
              <h2>Jogos Populares</h2>
              <p>Os mais avaliados pela comunidade</p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/games">
                Ver todos
                <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </Link>
            </Button>
          </S.SectionHeader>

          <S.GamesGrid $variant="compact">
            {popularGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                variant="compact"
                isFavorite={favorites.includes(game.id)}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </S.GamesGrid>
        </S.Container>
      </S.Section>

      {/* Top Rated Section */}
      <S.Section $altBg>
        <S.Container>
          <S.SectionHeader>
            <div>
              <h2>Mais Bem Avaliados</h2>
              <p>Jogos com as maiores notas</p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/games?sort=rating">
                Ver todos
                <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </Link>
            </Button>
          </S.SectionHeader>

          <S.GamesGrid $variant="default">
            {topRatedGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </S.GamesGrid>
        </S.Container>
      </S.Section>

      <S.Section>
        <S.Container>
          <S.CTACard>
            <div className="content">
              <h2>Receba Recomendações Personalizadas</h2>
              <p>
                Avalie seus jogos favoritos e deixe nosso sistema encontrar os próximos 
                títulos perfeitos para você com base em suas preferências.
              </p>
              <S.ButtonGroup>
                <Button asChild size="lg">
                  <Link href="/recommendations">Ver Recomendações</Link>
                </Button>
                
                <Button asChild size="lg" variant="outline">
                  <Link href="/games">Começar a Avaliar</Link>
                </Button>
              </S.ButtonGroup>
            </div>
          </S.CTACard>
        </S.Container>
      </S.Section>

      <Footer />
    </S.PageWrapper>
  );
}