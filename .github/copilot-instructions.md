Use estas instrucoes para trabalhar no frontend do Gamelog.

Contexto do projeto
- Este e um frontend Next.js 16.2.0 com React 19, TypeScript e styled-components.
- O projeto usa App Router, ESLint 9 e componentes inspirados em shadcn/ui, com Radix UI e Lucide React.
- A base principal a considerar e `src/`; a pasta `frontUxUi/` deve ser tratada como area separada ou legado, apenas quando a tarefa apontar explicitamente para ela.

Regras de implementacao
- Prefira componentes pequenos e focados, com separacao clara entre pagina, composicao visual e logica de estado.
- Siga o padrao existente de hooks em `src/hooks`, utilitarios em `src/lib`, tipos em `src/types` e estilos em `src/styles`.
- Use styled-components para novas interfaces e mantenha a consistencia com os arquivos `.styled.ts` ja presentes.
- Preserve a arquitetura do App Router e a organizacao por rotas e route groups.
- Nao introduza gerenciamento de estado ou bibliotecas de UI novas sem necessidade clara.
- Quando houver integracao com autenticacao, respeite o `AuthContext`, os hooks existentes e a navegacao protegida ja implementada.

Codigo e estilo
- Siga as convencoes de TypeScript do projeto e evite `any` quando houver alternativa tipada.
- Mantenha nomes descritivos para componentes, hooks e arquivos de estilo.
- Evite reformatar arquivos inteiros ou mexer em partes nao relacionadas.
- Preserve o visual e o comportamento das telas existentes; novas telas devem parecer parte do mesmo sistema.

Frontend e UX
- Priorize usabilidade, responsividade e consistencia visual com a base atual.
- Reaproveite componentes existentes antes de criar novas variacoes.
- Se a tarefa envolver pagina nova ou refino visual, mantenha a implementacao simples, funcional e alinhada ao design system existente.

Antes de concluir uma alteracao
- Verifique lint, tipos e comportamento de navegacao quando a mudanca afetar rotas ou componentes interativos.
- Confirme que a mudanca nao quebrou o padrrao de estilos com styled-components.
- Se a tarefa envolver autenticacao, valide que o fluxo continua coerente com o backend por sessao.