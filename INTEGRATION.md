# Guia de integracao — App.tsx + novos modulos

Este repositorio ja contem os modulos novos (financeiro e despesas), prontos
para uso. Falta conectar ao seu `App.tsx` original. Siga estes passos:

## 1. Adicione o App.tsx original

Faca upload do seu `src/App.tsx` atual (o mesmo que voce tem no Figma Make)
para esta branch, na pasta `src/`.

## 2. Remova as definicoes duplicadas de design system

No topo do `App.tsx`, remova as declaracoes de `Logo`, `Btn`, `Card` e
`StatusBadge` (elas ja existem em `src/components/ui/DesignSystem.tsx`).
Substitua pela importacao:

```tsx
import { Logo, Btn, Card, StatusBadge, Toggle } from "./components/ui/DesignSystem"
import { PainelFinanceiroDono } from "./components/financeiro/PainelFinanceiroDono"
import { PainelFinanceiroAluno } from "./components/financeiro/PainelFinanceiroAluno"
import { PainelDespesas } from "./components/despesas/PainelDespesas"
```

## 3. Adicione o item de navegacao "Despesas"

No array `NAV_ITEMS`, adicione:

```tsx
const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "rotas", label: "Minhas Rotas" },
  { id: "alunos", label: "Alunos" },
  { id: "financeiro", label: "Financeiro" },
  { id: "despesas", label: "Despesas" },
  { id: "config", label: "Configuracoes" },
]
```

E adicione um icone simples em `NavIcons` para a chave `despesas` (pode
reaproveitar o SVG do icone `financeiro` como placeholder).

## 4. Troque o painel financeiro antigo

Dentro de `DriverDashboard`, troque:

```tsx
{page === "financeiro" && <PainelFinanceiro />}
```

por:

```tsx
{page === "financeiro" && <PainelFinanceiroDono />}
{page === "despesas" && <PainelDespesas />}
```

E pode remover a funcao antiga `PainelFinanceiro` do arquivo (ela foi
substituida por `PainelFinanceiroDono`).

## 5. Exponha a visao financeira do aluno

Dentro de `StudentMobile`, adicione um botao/atalho (ex: no rodape do card)
que, ao ser clicado, alterne para renderizar `<PainelFinanceiroAluno />` no
lugar do mapa — ou crie uma 6a tela em `SCREENS`:

```tsx
const SCREENS = [
  { id: 0, label: "Pagina Inicial", mobile: false },
  { id: 1, label: "Painel Motorista", mobile: false },
  { id: 2, label: "Aluno - Mapa", mobile: true },
  { id: 3, label: "Proximidade", mobile: true },
  { id: 4, label: "Otimizacao de Rota", mobile: false },
  { id: 5, label: "Aluno - Financeiro", mobile: true },
]
```

e no `App()`:

```tsx
{screen === 5 && (
  <div style={{ width: 375, height: 812, overflowY: "auto" }} className="bg-white">
    <PainelFinanceiroAluno />
  </div>
)}
```

## 6. Instale a dependencia nova

```bash
npm install recharts
```

(ja adicionada ao `package.json` desta branch).

## 7. Teste local

```bash
npm install
npm run dev
```

Confira as 6 telas no menu superior e valide os 2 novos paineis do
motorista (Financeiro, Despesas) e a nova tela do aluno.
