import { FormEvent, MouseEvent, useEffect, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Gamepad2, Search, Star } from "lucide-react"
import { gamesAPI } from "@/lib/api"
import { GameSummary } from "@/types/game"
import * as S from "./Header.styled"

const SUGGESTION_LIMIT = 5
const DEBOUNCE_MS = 250
const MIN_QUERY_LENGTH = 1

function formatRating(value: number): string {
  return value > 0 ? value.toFixed(1) : "Sem nota"
}

function getSuggestionDescription(game: GameSummary): string {
  const description = game.descriptionPtBr?.trim() || game.description?.trim() || "Sem descrição disponível."

  return description.length > 120 ? `${description.slice(0, 117)}...` : description
}

export function SearchForm({ isMobile }: { isMobile?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get("q") ?? ""
  const [query, setQuery] = useState(currentQuery)
  const [suggestions, setSuggestions] = useState<GameSummary[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({})

  useEffect(() => {
    setQuery(currentQuery)
  }, [currentQuery])

  useEffect(() => {
    if (isMobile || !isFocused) {
      return
    }

    const trimmedQuery = query.trim()

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      setSuggestions([])
      setIsLoadingSuggestions(false)
      return
    }

    let isActive = true

    setIsLoadingSuggestions(true)
    setSuggestions([])

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await gamesAPI.explore({
          q: trimmedQuery,
          page: 0,
          size: SUGGESTION_LIMIT,
        })

        if (isActive) {
          setSuggestions(response.content)
        }
      } catch {
        if (isActive) {
          setSuggestions([])
        }
      } finally {
        if (isActive) {
          setIsLoadingSuggestions(false)
        }
      }
    }, DEBOUNCE_MS)

    return () => {
      isActive = false
      window.clearTimeout(timeoutId)
    }
  }, [isFocused, isMobile, query])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedQuery = query.trim()
    const params = new URLSearchParams(searchParams.toString())

    if (trimmedQuery) {
      params.set("q", trimmedQuery)
    } else {
      params.delete("q")
    }

    setIsFocused(false)
    setIsLoadingSuggestions(false)

    if (pathname !== "/jogos") {
      router.push(`/jogos${params.toString() ? `?${params.toString()}` : ""}`)
      return
    }

    router.push(`/jogos${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const trimmedQuery = query.trim()
  const shouldShowSuggestions = !isMobile && isFocused && trimmedQuery.length >= MIN_QUERY_LENGTH

  const handleSuggestionMouseDown = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button === 0 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey
    ) {
      event.preventDefault()
    }
  }

  const handleSuggestionSelect = () => {
    setIsFocused(false)
    setIsLoadingSuggestions(false)
  }

  return (
    <S.SearchWrapper $isMobile={isMobile} as="form" onSubmit={handleSubmit}>
      <Search size={16} />
      <S.SearchInput
        name="q"
        type="search"
        placeholder="Buscar jogos..."
        value={query}
        autoComplete="off"
        spellCheck={false}
        aria-autocomplete="list"
        aria-controls="header-search-suggestions"
        aria-expanded={shouldShowSuggestions}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={(event) => {
          const relatedTarget = event.relatedTarget

          if (relatedTarget instanceof Node && event.currentTarget.form?.contains(relatedTarget)) {
            return
          }

          setIsFocused(false)
          setIsLoadingSuggestions(false)
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsFocused(false)
            setIsLoadingSuggestions(false)
          }
        }}
      />

      {shouldShowSuggestions ? (
        <S.SearchSuggestions id="header-search-suggestions" aria-label="Sugestões de jogos">
          {isLoadingSuggestions ? (
            <S.SearchSuggestionsState role="status">Buscando jogos...</S.SearchSuggestionsState>
          ) : suggestions.length > 0 ? (
            <S.SearchSuggestionsList>
              {suggestions.map((game) => {
                const hasImage = Boolean(game.coverUrl) && !brokenImages[game.id]

                return (
                  <li key={game.id}>
                    <S.SearchSuggestionLink
                      href={`/jogos/${encodeURIComponent(game.slug)}`}
                      aria-label={`Abrir detalhes de ${game.name}`}
                      onMouseDown={handleSuggestionMouseDown}
                      onClick={handleSuggestionSelect}
                    >
                      <S.SearchSuggestionMedia>
                        {hasImage && game.coverUrl ? (
                          <Image
                            src={game.coverUrl}
                            alt={`Capa de ${game.name}`}
                            fill
                            sizes="64px"
                            onError={() => {
                              setBrokenImages((current) => ({
                                ...current,
                                [game.id]: true,
                              }))
                            }}
                          />
                        ) : (
                          <S.SearchSuggestionFallback>
                            <Gamepad2 size={16} />
                            <span>Sem capa</span>
                          </S.SearchSuggestionFallback>
                        )}
                      </S.SearchSuggestionMedia>

                      <S.SearchSuggestionBody>
                        <S.SearchSuggestionTitle>{game.name}</S.SearchSuggestionTitle>
                        <S.SearchSuggestionDescription>
                          {getSuggestionDescription(game)}
                        </S.SearchSuggestionDescription>
                        <S.SearchSuggestionMeta>
                          <S.SearchSuggestionRating>
                            <Star size={12} fill="currentColor" />
                            {formatRating(game.averageRating)}
                          </S.SearchSuggestionRating>
                        </S.SearchSuggestionMeta>
                      </S.SearchSuggestionBody>
                    </S.SearchSuggestionLink>
                  </li>
                )
              })}
            </S.SearchSuggestionsList>
          ) : (
            <S.SearchSuggestionsState role="status">Nenhum jogo encontrado.</S.SearchSuggestionsState>
          )}
        </S.SearchSuggestions>
      ) : null}
    </S.SearchWrapper>
  )
}