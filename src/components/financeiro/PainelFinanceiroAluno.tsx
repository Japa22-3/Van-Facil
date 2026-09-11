import { useMemo, useState } from "react";
import { Card, StatusBadge } from "../ui/DesignSystem";
import { alunosFinanceiro, pagamentosFinanceiro as pagamentosSeed } from "../../data/mockDataFinanceiro";
import type { Pagamento, StatusPagamento } from "../../types/financeiro";

const statusLabel: Record<StatusPagamento, string> = { pago: "Pago", pendente: "Pendente", atrasado: "Atrasado" };

function diasParaVencimento(dataVencimento: string): number {
  const hoje = new Date("2026-09-11");
  const venc = new Date(dataVencimento);
  return Math.ceil((venc.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
}

const ALUNO_LOGADO_ID = 4;

export const PainelFinanceiroAluno = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>(pagamentosSeed);
  const [arquivoEnviado, setArquivoEnviado] = useState<string | null>(null);

  const aluno = alunosFinanceiro.find((a) => a.id === ALUNO_LOGADO_ID)!;
  const meusPagamentos = useMemo(
    () => pagamentos.filter((p) => p.alunoId === ALUNO_LOGADO_ID).sort((a, b) => (a.referenciaMes < b.referenciaMes ? 1 : -1)),
    [pagamentos],
  );
  const pagamentoAtual = meusPagamentos.find((p) => p.referenciaMes === "2026-09")!;
  const dias = diasParaVencimento(pagamentoAtual.dataVencimento);

  const anexarComprovante = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setArquivoEnviado(file.name);
    setPagamentos((prev) => prev.map((p) => (p.id === pagamentoAtual.id ? { ...p, comprovanteNome: file.name } : p)));
  };

  const alertaCor = pagamentoAtual.status === "atrasado" ? "bg-red-50 border-red-200 text-red-700" : pagamentoAtual.status === "pendente" && dias <= 3 ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-green-50 border-green-200 text-green-700";

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Minha Mensalidade</h1>
        <p className="text-sm text-slate-500">Acompanhe pagamentos e vencimentos</p>
      </div>

      <div className={`rounded-2xl border p-4 ${alertaCor}`}>
        <div className="font-700 text-sm mb-1">
          {pagamentoAtual.status === "atrasado" ? `Mensalidade atrasada ha ${Math.abs(dias)} dia(s)` : pagamentoAtual.status === "pago" ? "Mensalidade de setembro em dia" : dias <= 3 ? `Vence em ${dias} dia(s) - evite atraso` : `Vence em ${dias} dias`}
        </div>
        <div className="text-xs opacity-80">Referencia: setembro/2026 - Vencimento {pagamentoAtual.dataVencimento}</div>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-slate-500">Valor mensal</div>
            <div className="text-2xl font-700 text-slate-900">R$ {aluno.mensalidade},00</div>
          </div>
          <StatusBadge label={statusLabel[pagamentoAtual.status]} active={pagamentoAtual.status === "pago"} color={pagamentoAtual.status === "pendente" ? "yellow" : pagamentoAtual.status === "atrasado" ? "red" : undefined} />
        </div>
        <div className="text-xs text-slate-500 mb-3">Vencimento todo dia {aluno.diaVencimento} - Forma preferida: {aluno.formaPagamentoPreferida}</div>

        {pagamentoAtual.status !== "pago" && (
          <div className="border-t border-slate-100 pt-4">
            <label className="text-xs font-600 text-slate-600 mb-2 block">Enviar comprovante de pagamento</label>
            <input type="file" accept="image/*,application/pdf" onChange={anexarComprovante} className="text-sm text-slate-600" />
            {arquivoEnviado && (
              <div className="mt-2 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2 inline-block">
                {arquivoEnviado} enviado - aguardando confirmacao do motorista (simulado)
              </div>
            )}
          </div>
        )}
      </Card>

      <div>
        <div className="text-xs font-600 text-slate-500 uppercase tracking-wide mb-3">Historico de pagamentos</div>
        <div className="space-y-2">
          {meusPagamentos.map((p) => (
            <Card key={p.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-600 text-slate-800">{p.referenciaMes}</div>
                <div className="text-xs text-slate-400">Vencimento {p.dataVencimento}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-700 text-slate-900">R$ {p.valorCobrado}</div>
                <StatusBadge label={statusLabel[p.status]} active={p.status === "pago"} color={p.status === "pendente" ? "yellow" : p.status === "atrasado" ? "red" : undefined} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
