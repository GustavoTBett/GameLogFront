"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { GameCard } from "@/components/features/games/GameCard";
import { genresAPI } from "@/lib/api";
import { useExploreGames } from "@/hooks/useExploreGames";
import { ExploreGamesFilters, GamePlatform, GenreOption } from "@/types/game";
import * as S from "../HomeClient.styled";

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

const LIMIT_OPTIONS = [12, 18, 24];

export default function GamesPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const [genres, setGenres] = useState<GenreOption[]>([]);
  const [genresError, setGenresError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [genreId, setGenreId] = useState<string>("");
  const [platform, setPlatform] = useState<"" | GamePlatform>("");
  const [minRating, setMinRating] = useState<string>("");
  const effectivePage = searchQuery ? 0 : page;

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

  const { games, meta, isLoading, error } = useExploreGames({
    page: effectivePage,
    size,
    filters,
  });

  const filteredGames = useMemo(() => {
    if (!searchQuery) {
      return games;
    }

    const normalizedQuery = searchQuery.toLowerCase();

    return games.filter((game) => {
      const searchableText = [
        game.name,
        game.description ?? "",
        game.developer ?? "",
        game.genres.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [games, searchQuery]);

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

      <S.Section>
        <S.Container>
          <S.SectionHeader>
            <S.SectionTitleWrap>
              <S.SectionTitle>Jogos</S.SectionTitle>
              <S.SectionSubtitle>
                Navegue pelo catálogo e abra qualquer jogo pela URL baseada em slug.
              </S.SectionSubtitle>
              {searchQuery ? (
                <S.SectionSubtitle>
                  Resultado da busca por: <strong>{searchQuery}</strong>
                </S.SectionSubtitle>
              ) : null}
            </S.SectionTitleWrap>
            <S.SectionLink href="/">
              Voltar para a home <ArrowRight size={16} />
            </S.SectionLink>
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
              <option value="5">A partir de 5</option>
              <option value="6">A partir de 6</option>
              <option value="7">A partir de 7</option>
              <option value="8">A partir de 8</option>
              <option value="9">A partir de 9</option>
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

          {error ? (
            <S.ErrorState>{error}</S.ErrorState>
          ) : isLoading ? (
            <S.EmptyState>Carregando catálogo...</S.EmptyState>
          ) : filteredGames.length === 0 ? (
            <S.EmptyState>Nenhum jogo encontrado com esses filtros.</S.EmptyState>
          ) : (
            <>
              <S.CardsGridDefault>
                {filteredGames.map((game) => (
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
                  disabled={!meta || meta.last || Boolean(searchQuery)}
                >
                  Próxima
                </S.PaginationButton>
              </S.Pagination>
              {searchQuery ? (
                <S.SectionSubtitle>
                  A paginação foi fixada na primeira página enquanto a busca por texto estiver ativa.
                </S.SectionSubtitle>
              ) : null}
            </>
          )}
        </S.Container>
      </S.Section>

      <Footer />
    </S.Wrapper>
  );
}