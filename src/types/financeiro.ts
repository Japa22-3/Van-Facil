export type StatusPagamento = "pago" | "pendente" | "atrasado";
export type FormaPagamento = "pix" | "dinheiro" | "cartao" | "transferencia";

export interface Aluno {
  id: number;
  name: string;
  addr: string;
  avatar: string;
  phone: string;
  turno: "Manha" | "Tarde";
  mensalidade: number;
  diaVencimento: number;
  formaPagamentoPreferida: FormaPagamento;
}

export interface Pagamento {
  id: string;
  alunoId: number;
  referenciaMes: string;
  valorCobrado: number;
  valorPago?: number;
  dataVencimento: string;
  dataPagamento?: string;
  formaPagamento?: FormaPagamento;
  status: StatusPagamento;
  comprovanteNome?: string;
  lembreteEnviadoEm?: string;
}

export type CategoriaDespesa =
  | "combustivel" | "pedagio" | "manutencao" | "seguro" | "ipva" | "limpeza" | "outros";

export const CATEGORIAS_DESPESA: { id: CategoriaDespesa; label: string; cor: string }[] = [
  { id: "combustivel", label: "Combustivel", cor: "#1A3FD4" },
  { id: "pedagio", label: "Pedagio", cor: "#10B981" },
  { id: "manutencao", label: "Manutencao", cor: "#F59E0B" },
  { id: "seguro", label: "Seguro", cor: "#8B5CF6" },
  { id: "ipva", label: "IPVA", cor: "#EC4899" },
  { id: "limpeza", label: "Limpeza", cor: "#06B6D4" },
  { id: "outros", label: "Outros", cor: "#94A3B8" },
];

export interface DespesaVan {
  id: string;
  categoria: CategoriaDespesa;
  descricao: string;
  valor: number;
  data: string;
  kmNoMomento?: number;
  comprovanteNome?: string;
}

export interface ManutencaoRegistro {
  id: string;
  tipo: string;
  dataRealizada: string;
  kmRealizada: number;
  proximaKmPrevista?: number;
  proximaDataPrevista?: string;
  custo: number;
}

export interface ResumoFinanceiro {
  totalRecebido: number;
  totalPendente: number;
  totalAtrasado: number;
  qtdInadimplentes: number;
  previsaoRecebimento: number;
}
