import { useState } from "react"
import { Search } from "lucide-react"
import * as S from "./Header.styled"

export function SearchForm({ isMobile }: { isMobile?: boolean }) {
  const [query, setQuery] = useState("")

  return (
    <S.SearchWrapper $isMobile={isMobile}>
      <Search size={16} />
      <S.SearchInput
        type="search"
        placeholder="Buscar jogos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </S.SearchWrapper>
  )
}