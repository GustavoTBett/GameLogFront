"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Gamepad2, Star, TrendingUp, Users } from "lucide-react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { genresAPI } from "@/lib/api";
import { useExploreGames } from "@/hooks/useExploreGames";
import { useHomeGames } from "@/hooks/useHomeGames";
import { useAuth } from "@/hooks/useAuth";
import { GameCard } from "@/components/features/games/GameCard";
import { ExploreGamesFilters, GamePlatform, GenreOption } from "@/types/game";
import * as S from "./HomeClient.styled";

const PLATFORM_OPTIONS: Array<{ value: "" | GamePlatform; label: string }> = [
  { value: "", label: "Todas plataformas" },
  { value: "PC", label: "PC" },
  { value: "PLAYSTATION", label: "PlayStation" },
  { value: "XBOX", label: "Xbox" },
  { value: "NINTENDO", label: "Nintendo" },
  { value: "MOBILE", label: "Mobile" },
  { value: "CLOUD", label: "Cloud" },
  { value: "VR", label: "VR" },
  { value: "ARCADE", label: "Arcade" },
];

const LIMIT_OPTIONS = [6, 12, 18, 24];

export default function HomeClient() {
  const { isAuthenticated } = useAuth();
  const { popularGames, topRatedGames, isLoading: isLoadingHome, error: homeError } = useHomeGames(6);

  const [genres, setGenres] = useState<GenreOption[]>([]);
  const [genresError, setGenresError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [genreId, setGenreId] = useState<string>("");
  const [platform, setPlatform] = useState<"" | GamePlatform>("");
  const [minRating, setMinRating] = useState<string>("");

  const filters = useMemo<ExploreGamesFilters>(() => {
    const value: ExploreGamesFilters = {};

    if (genreId) {
      value.genreId = Number(genreId);
    }

    if (platform) {
      value.platform = platform;
    }

    if (minRating) {
      value.minRating = Number(minRating);
    }

    return value;
  }, [genreId, minRating, platform]);

  const { games: exploreGames, meta, isLoading: isLoadingExplore, error: exploreError } = useExploreGames({
    page,
    size,
    filters,
  });

  useEffect(() => {
    let isCancelled = false;

    const loadGenres = async () => {
      try {
        const data = await genresAPI.getAll();
        if (!isCancelled) {
          setGenres(data);
        }
      } catch (err) {
        if (!isCancelled) {
          const message = err instanceof Error ? err.message : "Erro ao carregar gêneros";
          setGenresError(message);
        }
      }
    };

    loadGenres();

    return () => {
      isCancelled = true;
    };
  }, []);


  return (
    <S.Wrapper>
      <Header />

      <S.HeroSection>
        <S.HeroBackground />
        <S.Container>
          <S.HeroTitle>
            Descubra, Avalie e Compartilhe <S.HeroAccent>Jogos</S.HeroAccent>
          </S.HeroTitle>
          <S.HeroDescription>
            Sua plataforma para avaliar jogos, descobrir novos títulos e acompanhar os destaques da comunidade.
          </S.HeroDescription>

          <S.HeroActions>
            <S.HeroButton href="/jogos">
              Explorar Jogos
              <ArrowRight size={18} />
            </S.HeroButton>
            {!isAuthenticated ? (
              <S.HeroButton href="/register" $variant="outline">
                Criar Conta
              </S.HeroButton>
            ) : null}
          </S.HeroActions>

          <S.StatsGrid>
            <S.StatCard>
              <Gamepad2 size={26} color="#16a34a" />
              <S.StatValue>{meta?.totalElements ?? "-"}</S.StatValue>
              <S.StatLabel>Jogos indexados</S.StatLabel>
            </S.StatCard>
            <S.StatCard>
              <Users size={26} color="#16a34a" />
              <S.StatValue>{popularGames.reduce((sum, game) => sum + game.totalReviews, 0)}</S.StatValue>
              <S.StatLabel>Avaliações nas vitrines</S.StatLabel>
            </S.StatCard>
            <S.StatCard>
              <Star size={26} color="#16a34a" />
              <S.StatValue>
                {topRatedGames.length
                  ? (topRatedGames.reduce((sum, game) => sum + game.averageRating, 0) / topRatedGames.length).toFixed(1)
                  : "-"}
              </S.StatValue>
              <S.StatLabel>Média dos destaques</S.StatLabel>
            </S.StatCard>
            <S.StatCard>
              <TrendingUp size={26} color="#16a34a" />
              <S.StatValue>{Math.max(meta?.totalPages ?? 0, 1)}</S.StatValue>
              <S.StatLabel>Páginas para explorar</S.StatLabel>
            </S.StatCard>
          </S.StatsGrid>
        </S.Container>
      </S.HeroSection>

      <S.Section>
        <S.Container>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Jogos Populares</S.SectionTitle>
              <S.SectionSubtitle>Os mais avaliados pela comunidade</S.SectionSubtitle>
            </S.SectionTitleWrap>
            <S.SectionLink href="/jogos">
              Ver todos <ArrowRight size={16} />
            </S.SectionLink>
          </S.SectionHeader>

          {homeError ? (
            <S.ErrorState>{homeError}</S.ErrorState>
          ) : isLoadingHome ? (
            <S.EmptyState>Carregando jogos populares...</S.EmptyState>
          ) : (
            <S.CardsGridCompact>
              {popularGames.map((game) => (
                <GameCard key={game.id} game={game} href={`/jogos/${game.slug}`} />
              ))}
            </S.CardsGridCompact>
          )}
        </S.Container>
      </S.Section>

      <S.Section $muted>
        <S.Container>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Mais Bem Avaliados</S.SectionTitle>
              <S.SectionSubtitle>Jogos com as maiores notas</S.SectionSubtitle>
            </S.SectionTitleWrap>
            <S.SectionLink href="/jogos">
              Ver todos <ArrowRight size={16} />
            </S.SectionLink>
          </S.SectionHeader>

          {homeError ? (
            <S.ErrorState>{homeError}</S.ErrorState>
          ) : isLoadingHome ? (
            <S.EmptyState>Carregando jogos mais bem avaliados...</S.EmptyState>
          ) : (
            <S.CardsGridDefault>
              {topRatedGames.slice(0, 3).map((game) => (
                <GameCard key={game.id} game={game} href={`/jogos/${game.slug}`} />
              ))}
            </S.CardsGridDefault>
          )}
        </S.Container>
      </S.Section>

      <S.Section>
        <S.Container>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Explorar jogos</S.SectionTitle>
              <S.SectionSubtitle>Pagine e filtre por gênero, plataforma e nota mínima</S.SectionSubtitle>
            </S.SectionTitleWrap>
          </S.SectionHeader>

          <S.FiltersWrap>
            <S.Select
              value={genreId}
              onChange={(event) => {
                setGenreId(event.target.value);
                setPage(0);
              }}
              aria-label="Filtrar por gênero"
            >
              <option value="">Todos os gêneros</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </S.Select>

            <S.Select
              value={platform}
              onChange={(event) => {
                setPlatform(event.target.value as "" | GamePlatform);
                setPage(0);
              }}
              aria-label="Filtrar por plataforma"
            >
              {PLATFORM_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.Select>

            <S.Select
              value={minRating}
              onChange={(event) => {
                setMinRating(event.target.value);
                setPage(0);
              }}
              aria-label="Filtrar por nota mínima"
            >
              <option value="">Qualquer nota</option>
              <option value="1">A partir de 1</option>
              <option value="2">A partir de 2</option>
              <option value="3">A partir de 3</option>
              <option value="4">A partir de 4</option>
              <option value="5">A partir de 5</option>
              <option value="6">A partir de 6</option>
              <option value="7">A partir de 7</option>
              <option value="8">A partir de 8</option>
              <option value="9">A partir de 9</option>
              <option value="10">A partir de 10</option>
            </S.Select>

            <S.Select
              value={size}
              onChange={(event) => {
                setSize(Number(event.target.value));
                setPage(0);
              }}
              aria-label="Quantidade por página"
            >
              {LIMIT_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {value} por página
                </option>
              ))}
            </S.Select>
          </S.FiltersWrap>

          {genresError ? <S.ErrorState>{genresError}</S.ErrorState> : null}

          {exploreError ? (
            <S.ErrorState>{exploreError}</S.ErrorState>
          ) : isLoadingExplore ? (
            <S.EmptyState>Carregando catálogo...</S.EmptyState>
          ) : exploreGames.length === 0 ? (
            <S.EmptyState>Nenhum jogo encontrado com esses filtros.</S.EmptyState>
          ) : (
            <>
              <S.CardsGridDefault>
                {exploreGames.map((game) => (
                  <GameCard key={game.id} game={game} href={`/jogos/${game.slug}`} />
                ))}
              </S.CardsGridDefault>

              <S.Pagination>
                <S.PaginationButton
                  onClick={() => setPage((current) => Math.max(0, current - 1))}
                  disabled={!meta || meta.first}
                >
                  Anterior
                </S.PaginationButton>
                <span>
                  Página {(meta?.page ?? 0) + 1} de {Math.max(meta?.totalPages ?? 1, 1)}
                </span>
                <S.PaginationButton
                  onClick={() => setPage((current) => current + 1)}
                  disabled={!meta || meta.last}
                >
                  Próxima
                </S.PaginationButton>
              </S.Pagination>
            </>
          )}
        </S.Container>
      </S.Section>

      <Footer />
    </S.Wrapper>
  );
}
