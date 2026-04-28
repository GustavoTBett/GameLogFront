import { FormEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import * as S from "./Header.styled"

export function SearchForm({ isMobile }: { isMobile?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get("q") ?? ""

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const rawQuery = formData.get("q")
    const trimmedQuery = typeof rawQuery === "string" ? rawQuery.trim() : ""
    const params = new URLSearchParams(searchParams.toString())

    if (trimmedQuery) {
      params.set("q", trimmedQuery)
    } else {
      params.delete("q")
    }

    if (pathname !== "/jogos") {
      router.push(`/jogos${params.toString() ? `?${params.toString()}` : ""}`)
      return
    }

    router.push(`/jogos${params.toString() ? `?${params.toString()}` : ""}`)
  }

  return (
    <S.SearchWrapper $isMobile={isMobile} as="form" onSubmit={handleSubmit}>
      <Search size={16} />
      <S.SearchInput
        name="q"
        type="search"
        placeholder="Buscar jogos..."
        defaultValue={currentQuery}
        key={currentQuery}
      />
    </S.SearchWrapper>
  )
}