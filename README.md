# Gamelog Front

Frontend principal do Gamelog, construído com Next.js e conectado à API Spring Boot do projeto.

## Escopo

Este README documenta o app raiz em `GamelogFront/`.

A pasta `frontUxUi/` existe no repositório como um workspace separado e não faz parte deste documento.

## Visão geral

O frontend entrega a interface para:

- navegar pela home com destaques, populares e top rated;
- explorar jogos com filtros e paginação;
- visualizar detalhes de jogos por slug;
- autenticar usuários;
- registrar novos usuários;
- solicitar e redefinir senha;
- alternar tema claro/escuro;
- manter sessão sincronizada com o backend.

## Stack

- Next.js 16.2.0
- React 19.2.3
- TypeScript
- styled-components 6
- Lucide React
- Radix UI Dropdown Menu
- ESLint 9

## Estrutura principal

O app usa App Router em `src/app` e os principais arquivos são:

- `src/app/layout.tsx` para providers globais e layout raiz
- `src/app/page.tsx` para a home
- `src/app/HomeClient.tsx` para a interface principal da home
- `src/app/jogos/page.tsx` para a listagem de jogos
- `src/app/jogos/[slug]/` para a página de detalhe do jogo
- `src/app/(auth)/login`, `register`, `forgot-password` e `reset-password` para autenticação

## Componentes e hooks relevantes

- `src/lib/api.ts` centraliza as chamadas HTTP e o fluxo de CSRF
- `src/lib/AuthContext.tsx` controla a sessão do usuário
- `src/lib/ThemeProvider.tsx` aplica o tema e persiste a preferência no `localStorage`
- `src/app/ClientLayout.tsx` sincroniza a sessão ao carregar a aplicação
- `src/hooks/useAuth.ts` e `src/hooks/useAuthInit.ts` tratam autenticação no cliente
- `src/hooks/useHomeGames.ts` carrega populares e top rated da home
- `src/hooks/useExploreGames.ts` carrega a listagem filtrada de jogos

## Integração com o backend

O frontend consome a API do backend via `src/lib/api.ts`.

- URL base padrão: `http://localhost:8080`
- variável opcional: `NEXT_PUBLIC_API_BASE_URL`
- as requisições usam `credentials: include`
- o token CSRF é obtido em `GET /auth/csrf`
- o cliente chama `authAPI`, `gamesAPI` e `genresAPI`

## Rotas e fluxo atual

### Páginas implementadas

- `/` - home com hero, estatísticas, populares, top rated e exploração
- `/jogos` - catálogo explorável com filtros de gênero, plataforma, nota mínima e paginação
- `/jogos/[slug]` - detalhe do jogo
- `/login` - login
- `/register` - cadastro
- `/forgot-password` - solicitação de redefinição de senha
- `/reset-password` - criação de nova senha

### Observação de navegação

O header já expõe links para favoritos e recomendações, mas o app raiz ainda não possui rotas correspondentes neste recorte do projeto.

## Como rodar localmente

1. Garanta que o backend esteja em execução em `http://localhost:8080`.
2. Instale dependências:

```bash
npm install
```

3. Inicie o frontend:

```bash
npm run dev
```

A aplicação sobe em `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Variáveis de ambiente

Crie um `.env.local` com, no mínimo, a URL da API quando ela não estiver no padrão local:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Layout visual e estado de sessão

O layout raiz monta a aplicação nesta ordem:

- `StyleRegistry`
- `AuthProvider`
- `AppThemeProvider`
- `ClientLayout`
- conteúdo da página

Isso garante que:

- os estilos do styled-components sejam registrados corretamente;
- a sessão seja inicializada no cliente;
- o tema seja aplicado antes da renderização final;
- o carregamento da home e das páginas autenticadas use a mesma infraestrutura.

## Páginas principais da home

A home exibe:

- hero com chamada principal;
- estatísticas de catálogo;
- jogos populares;
- jogos mais bem avaliados;
- área de exploração com filtros e paginação.

## Notas de desenvolvimento

- O projeto usa `styled-components` no frontend raiz.
- O tema é persistido em `localStorage` com a chave `app-theme`.
- O cliente de API invalida o cache de CSRF após login, logout e ações sensíveis.
- O app depende da sessão criada no backend; sem a API funcionando, as telas autenticadas e os dados da home não carregam corretamente.
