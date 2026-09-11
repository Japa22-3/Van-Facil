# VanFacil

Plataforma web para conectar **donos/motoristas de van universitaria** e **alunos passageiros**, dando agilidade, controle financeiro e comunicacao em tempo real -- sem depender de planilhas soltas, grupos de WhatsApp desorganizados ou anotacoes em papel.

Preview ao vivo (GitHub Pages): https://japa22-3.github.io/Van-Facil/

> O preview atual mostra os **modulos novos** (Financeiro e Despesas). As telas originais do prototipo (Landing Page, Dashboard do motorista com mapa/rotas, tela mobile do aluno, notificacao de proximidade) estao no historico do projeto e serao reintegradas na proxima etapa -- veja `INTEGRATION.md`.

## Problema que o projeto resolve

Donos de van e alunos hoje perdem tempo e dinheiro por falta de um sistema unico que centralize: quem pagou a mensalidade, quem esta atrasado, quanto a van gastou com combustivel/pedagio/manutencao no mes, qual o lucro real, onde a van esta agora, e quais avisos importantes cada aluno recebeu.

## Funcionalidades implementadas

### Modulo Financeiro (mensalidades)
- Painel do dono: total recebido no mes, total pendente, numero de inadimplentes, previsao de recebimento.
- Cadastro de mensalidade por aluno (valor, forma de pagamento).
- Lista de pagamentos com destaque visual por status (pago / pendente / atrasado).
- Historico de pagamentos por aluno, mes a mes.
- Botao de lembrete de cobranca (simulado).
- Exportacao de relatorio em CSV.
- Painel do aluno: mensalidade propria, alerta de vencimento/atraso, historico e upload simulado de comprovante.

### Controle de Gastos da Van
- Cadastro de despesas por categoria: combustivel, pedagio, manutencao, seguro, IPVA, limpeza, outros.
- Graficos (Recharts): distribuicao por categoria (pizza), evolucao mensal (barras), receita vs. despesa.
- Calculo automatico de custo por km rodado.
- Filtro por periodo (7 dias / 30 dias / tudo) e exportacao em CSV.

## Roadmap -- proximas melhorias

### Para o aluno
- Status/localizacao da van em tempo real (simulado).
- Mural de avisos do motorista destacado na tela inicial.
- Chat com o motorista.
- Perfil completo (endereco de embarque/desembarque, horario fixo).
- Avaliacao do servico (nota + comentario).
- Aviso de ausencia (avisar que nao vai usar a van em um dia especifico).

### Para o dono da van
- Gestao de rota (ordem de embarque, enderecos, horarios).
- Gestao de vagas e lista de espera.
- Cadastro completo de alunos (documentos, contato do responsavel, escola/turno).
- Painel de avisos segmentado (todos ou grupos especificos).
- Historico de manutencao com alertas por km/data.
- Dashboard consolidado (financeiro + despesas + ocupacao da van).

### Diferenciais planejados
- Modo escuro/claro.
- PWA com notificacoes push simuladas.
- Divisao automatica dos custos do mes entre alunos, sugerindo ajuste de mensalidade.
- QR Code de embarque para confirmar presenca.
- Area de documentos (contratos, comprovantes, termos de uso).
- Suporte a multiplas vans/motoristas.
- Integracao real com Supabase (banco de dados, autenticacao, storage de comprovantes).

## Stack tecnica

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- Recharts (graficos financeiros)
- Deploy automatico via GitHub Actions + GitHub Pages
- Preparado para integracao futura com Supabase (Postgres + Auth + Storage)

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura do projeto

```
src/
  components/
    ui/DesignSystem.tsx        # Logo, Btn, Card, StatusBadge, Toggle
    financeiro/
      PainelFinanceiroDono.tsx
      PainelFinanceiroAluno.tsx
    despesas/
      PainelDespesas.tsx
  data/mockDataFinanceiro.ts   # dados ficticios para teste
  types/financeiro.ts          # tipos centrais (preparados para Supabase)
  App.tsx                      # shell atual (preview dos modulos novos)
```

Veja `INTEGRATION.md` para o passo a passo de como reintegrar as telas originais do prototipo (Landing, Dashboard completo do motorista, mapa do aluno) a este shell.
