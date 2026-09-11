import type { Aluno, Pagamento, DespesaVan, ManutencaoRegistro } from "../types/financeiro";

export const alunosFinanceiro: Aluno[] = [
  { id: 1, name: "Ana Carolina Lima", addr: "Rua das Flores, 142", avatar: "AC", phone: "(11) 9 8765-4321", turno: "Manha", mensalidade: 320, diaVencimento: 5, formaPagamentoPreferida: "pix" },
  { id: 2, name: "Bruno Ferreira", addr: "Av. Brasil, 880", avatar: "BF", phone: "(11) 9 7654-3210", turno: "Manha", mensalidade: 320, diaVencimento: 5, formaPagamentoPreferida: "cartao" },
  { id: 3, name: "Camila Souza", addr: "R. Dom Pedro, 55", avatar: "CS", phone: "(11) 9 6543-2109", turno: "Tarde", mensalidade: 280, diaVencimento: 10, formaPagamentoPreferida: "pix" },
  { id: 4, name: "Diego Martins", addr: "Av. Paulista, 1200", avatar: "DM", phone: "(11) 9 5432-1098", turno: "Manha", mensalidade: 320, diaVencimento: 5, formaPagamentoPreferida: "transferencia" },
  { id: 5, name: "Elena Rocha", addr: "R. XV de Novembro, 300", avatar: "ER", phone: "(11) 9 4321-0987", turno: "Tarde", mensalidade: 280, diaVencimento: 10, formaPagamentoPreferida: "pix" },
  { id: 6, name: "Felipe Nunes", addr: "R. Marechal Rondon, 88", avatar: "FN", phone: "(11) 9 3210-9876", turno: "Manha", mensalidade: 320, diaVencimento: 5, formaPagamentoPreferida: "dinheiro" },
  { id: 7, name: "Giovana Prado", addr: "Av. Santos Dumont, 450", avatar: "GP", phone: "(11) 9 2109-8765", turno: "Tarde", mensalidade: 280, diaVencimento: 10, formaPagamentoPreferida: "pix" },
  { id: 8, name: "Henrique Costa", addr: "R. Ipiranga, 220", avatar: "HC", phone: "(11) 9 1098-7654", turno: "Manha", mensalidade: 320, diaVencimento: 5, formaPagamentoPreferida: "cartao" },
];

export const pagamentosFinanceiro: Pagamento[] = [
  { id: "1-2026-09", alunoId: 1, referenciaMes: "2026-09", valorCobrado: 320, valorPago: 320, dataVencimento: "2026-09-05", dataPagamento: "2026-09-04", formaPagamento: "pix", status: "pago" },
  { id: "2-2026-09", alunoId: 2, referenciaMes: "2026-09", valorCobrado: 320, valorPago: 320, dataVencimento: "2026-09-05", dataPagamento: "2026-09-05", formaPagamento: "cartao", status: "pago" },
  { id: "3-2026-09", alunoId: 3, referenciaMes: "2026-09", valorCobrado: 280, dataVencimento: "2026-09-10", status: "pendente" },
  { id: "4-2026-09", alunoId: 4, referenciaMes: "2026-09", valorCobrado: 320, dataVencimento: "2026-09-05", status: "atrasado" },
  { id: "5-2026-09", alunoId: 5, referenciaMes: "2026-09", valorCobrado: 280, dataVencimento: "2026-09-10", status: "atrasado" },
  { id: "6-2026-09", alunoId: 6, referenciaMes: "2026-09", valorCobrado: 320, valorPago: 320, dataVencimento: "2026-09-05", dataPagamento: "2026-09-06", formaPagamento: "dinheiro", status: "pago" },
  { id: "7-2026-09", alunoId: 7, referenciaMes: "2026-09", valorCobrado: 280, dataVencimento: "2026-09-10", status: "pendente" },
  { id: "8-2026-09", alunoId: 8, referenciaMes: "2026-09", valorCobrado: 320, valorPago: 320, dataVencimento: "2026-09-05", dataPagamento: "2026-09-05", formaPagamento: "cartao", status: "pago" }
];

export const despesasVan: DespesaVan[] = [
  { id: "d1", categoria: "combustivel", descricao: "Abastecimento - Posto Ipiranga", valor: 210.5, data: "2026-09-02", kmNoMomento: 48210 },
  { id: "d2", categoria: "pedagio", descricao: "Pedagio Rota Manha A", valor: 64.0, data: "2026-09-05" },
  { id: "d3", categoria: "manutencao", descricao: "Troca de oleo e filtros", valor: 350.0, data: "2026-09-06", kmNoMomento: 48300 },
  { id: "d4", categoria: "seguro", descricao: "Parcela seguro veiculo 6/12", valor: 289.9, data: "2026-09-08" },
  { id: "d5", categoria: "combustivel", descricao: "Abastecimento - Posto Shell", valor: 198.3, data: "2026-09-09", kmNoMomento: 48540 },
  { id: "d6", categoria: "limpeza", descricao: "Lavagem completa da van", valor: 45.0, data: "2026-09-10" },
  { id: "d7", categoria: "pedagio", descricao: "Pedagio Rota Tarde B", valor: 38.0, data: "2026-09-10" },
  { id: "d8", categoria: "outros", descricao: "Multa de transito leve", valor: 130.16, data: "2026-09-03" },
  { id: "d9", categoria: "ipva", descricao: "IPVA 2026 - parcela 3/3", valor: 220.0, data: "2026-08-28" },
  { id: "d10", categoria: "combustivel", descricao: "Abastecimento - Posto BR", valor: 205.0, data: "2026-08-15" },
  { id: "d11", categoria: "manutencao", descricao: "Alinhamento e balanceamento", valor: 180.0, data: "2026-08-20" }
];

export const manutencaoHistorico: ManutencaoRegistro[] = [
  { id: "m1", tipo: "Troca de oleo", dataRealizada: "2026-09-06", kmRealizada: 48300, proximaKmPrevista: 53300, proximaDataPrevista: "2026-12-06", custo: 350 },
  { id: "m2", tipo: "Alinhamento e balanceamento", dataRealizada: "2026-08-20", kmRealizada: 47100, proximaKmPrevista: 57100, proximaDataPrevista: "2027-02-20", custo: 180 },
  { id: "m3", tipo: "Revisao de freios", dataRealizada: "2026-06-02", kmRealizada: 44000, proximaKmPrevista: 54000, proximaDataPrevista: "2026-12-02", custo: 420 }
];

export const KM_RODADO_MES = 1380;
