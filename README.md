# VanFacil

Plataforma para motoristas e alunos de van universitaria: rotas, financeiro (mensalidades), controle de gastos da van e comunicacao em tempo real.

## Status desta branch

Esta branch (`feature/modulo-financeiro-despesas`) traz:

- Configuracao base do projeto (Vite + React + TypeScript + Tailwind v4).
- Modulo financeiro completo: visao do dono (`src/components/financeiro/PainelFinanceiroDono.tsx`) e visao do aluno (`src/components/financeiro/PainelFinanceiroAluno.tsx`).
- Modulo de despesas da van com graficos Recharts (`src/components/despesas/PainelDespesas.tsx`).
- Tipos e dados ficticios (`src/types/financeiro.ts`, `src/data/mockDataFinanceiro.ts`).
- Design system extraido e reutilizavel (`src/components/ui/DesignSystem.tsx`).

## Pendente

O arquivo `src/App.tsx` original (telas de Landing, Dashboard do motorista, tela mobile do aluno, notificacao de proximidade e otimizacao de rota) precisa ser adicionado manualmente a esta branch — veja `INTEGRATION.md` para o passo a passo exato de como conectar os novos modulos a ele.

## Rodando localmente

```bash
npm install
npm run dev
```
