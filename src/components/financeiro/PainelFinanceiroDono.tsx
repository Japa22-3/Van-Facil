import { useMemo, useState } from "react";
import { Btn, Card, StatusBadge } from "../ui/DesignSystem";
import { alunosFinanceiro, pagamentosFinanceiro as pagamentosSeed } from "../../data/mockDataFinanceiro";
import type { Aluno, FormaPagamento, Pagamento, ResumoFinanceiro, StatusPagamento } from "../../types/financeiro";

const REFERENCIA_ATUAL = "2026-09";

const statusColor: Record<StatusPagamento, "blue" | "yellow" | "red" | undefined> = {
  pago: undefined,
  pendente: "yellow",
  atrasado: "red",
};

const statusLabel: Record<StatusPagamento, string> = {
  pago: "Pago",
  pendente: "Pendente",
  atrasado: "Atrasado",
};

function calcularResumo(pagamentos: Pagamento[], referencia: string): ResumoFinanceiro {
  const doMes = pagamentos.filter((p) => p.referenciaMes === referencia);
  const totalRecebido = doMes.filter((p) => p.status === "pago").reduce((a, p) => a + (p.valorPago ?? 0), 0);
  const totalPendente = doMes.filter((p) => p.status === "pendente").reduce((a, p) => a + p.valorCobrado, 0);
  const totalAtrasado = doMes.filter((p) => p.status === "atrasado").reduce((a, p) => a + p.valorCobrado, 0);
  const qtdInadimplentes = doMes.filter((p) => p.status === "atrasado").length;
  return { totalRecebido, totalPendente, totalAtrasado, qtdInadimplentes, previsaoRecebimento: totalPendente + totalAtrasado };
}

function exportarCsv(pagamentos: Pagamento[], alunos: Aluno[]) {
  const linhas = [
    ["Aluno", "Mes", "Valor cobrado", "Valor pago", "Vencimento", "Status", "Forma"].join(";"),
    ...pagamentos.map((p) => {
      const aluno = alunos.find((a) => a.id === p.alunoId);
      return [aluno?.name ?? "-", p.referenciaMes, p.valorCobrado.toFixed(2), (p.valorPago ?? 0).toFixed(2), p.dataVencimento, statusLabel[p.status], p.formaPagamento ?? "-"].join(";");
    }),
  ];
  const blob = new Blob([linhas.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `relatorio-financeiro-${REFERENCIA_ATUAL}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export const PainelFinanceiroDono = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>(pagamentosSeed);
  const [referencia, setReferencia] = useState(REFERENCIA_ATUAL);
  const [filtroStatus, setFiltroStatus] = useState<"todos" | StatusPagamento>("todos");
  const [alunoExpandido, setAlunoExpandido] = useState<number | null>(null);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [novoValor, setNovoValor] = useState("320");
  const [novaForma, setNovaForma] = useState<FormaPagamento>("pix");
  const [novoAlunoId, setNovoAlunoId] = useState(alunosFinanceiro[0]?.id ?? 0);

  const resumo = useMemo(() => calcularResumo(pagamentos, referencia), [pagamentos, referencia]);

  const doMes = pagamentos.filter((p) => p.referenciaMes === referencia).filter((p) => filtroStatus === "todos" || p.status === filtroStatus);

  const enviarLembrete = (pagamentoId: string) => {
    setPagamentos((prev) => prev.map((p) => (p.id === pagamentoId ? { ...p, lembreteEnviadoEm: new Date().toISOString() } : p)));
    setToast("Lembrete enviado (simulado).");
    setTimeout(() => setToast(null), 3500);
  };

  const salvarMensalidade = () => {
    setModalCadastro(false);
    setToast(`Mensalidade de R$ ${novoValor} configurada.`);
    setTimeout(() => setToast(null), 3000);
  };

  const historicoDoAluno = (alunoId: number) =>
    pagamentos.filter((p) => p.alunoId === alunoId).sort((a, b) => (a.referenciaMes < b.referenciaMes ? 1 : -1));

  return (
    <>
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Financeiro - Mensalidades</h1>
          <p className="text-sm text-slate-500">Cobrancas, pendencias e historico dos alunos</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-full p-1 gap-1">
            {["2026-07", "2026-08", "2026-09"].map((m) => (
              <button key={m} onClick={() => setReferencia(m)} className={`px-4 py-1 rounded-full text-sm font-500 cursor-pointer border-0 ${referencia === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                {m.split("-")[1] === "07" ? "Jul" : m.split("-")[1] === "08" ? "Ago" : "Set"} 2026
              </button>
            ))}
          </div>
          <Btn variant="secondary" size="sm" onClick={() => exportarCsv(doMes, alunosFinanceiro)}>Exportar relatorio</Btn>
          <Btn variant="primary" size="sm" onClick={() => setModalCadastro(true)}>+ Cadastrar mensalidade</Btn>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
        {toast && <div className="mb-5 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-700">{toast}</div>}

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total recebido no mes", value: `R$ ${resumo.totalRecebido.toLocaleString("pt-BR")}`, color: "text-green-600" },
            { label: "Total pendente", value: `R$ ${resumo.totalPendente.toLocaleString("pt-BR")}`, color: "text-amber-600" },
            { label: "Alunos inadimplentes", value: resumo.qtdInadimplentes, color: "text-red-600" },
            { label: "Previsao de recebimento", value: `R$ ${resumo.previsaoRecebimento.toLocaleString("pt-BR")}`, color: "text-blue-600" },
          ].map(({ label, value, color }) => (
            <Card key={label} className="p-5">
              <div className="text-xs text-slate-500 mb-2">{label}</div>
              <div className={`text-2xl font-700 ${color}`}>{value}</div>
            </Card>
          ))}
        </div>

        {modalCadastro && (
          <Card className="p-6 mb-6 border-blue-200 bg-blue-50/30">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-700 text-slate-900">Cadastrar / atualizar mensalidade</h3>
              <button onClick={() => setModalCadastro(false)} className="text-slate-400 cursor-pointer bg-transparent border-0 text-lg">x</button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs font-600 text-slate-600 mb-1 block">Aluno</label>
                <select value={novoAlunoId} onChange={(e) => setNovoAlunoId(Number(e.target.value))} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white">
                  {alunosFinanceiro.map((a) => (<option key={a.id} value={a.id}>{a.name}</option>))}
                </select>
              </div>
              <div>
                <label className="text-xs font-600 text-slate-600 mb-1 block">Valor (R$)</label>
                <input value={novoValor} onChange={(e) => setNovoValor(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="text-xs font-600 text-slate-600 mb-1 block">Forma de pagamento</label>
                <select value={novaForma} onChange={(e) => setNovaForma(e.target.value as FormaPagamento)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white">
                  <option value="pix">Pix</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao">Cartao</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Btn variant="primary" size="sm" onClick={salvarMensalidade}>Salvar</Btn>
              <Btn variant="ghost" size="sm" onClick={() => setModalCadastro(false)}>Cancelar</Btn>
            </div>
          </Card>
        )}

        <div className="flex items-center gap-2 mb-4">
          {(["todos", "pago", "pendente", "atrasado"] as const).map((s) => (
            <button key={s} onClick={() => setFiltroStatus(s)} className={`px-4 py-1.5 rounded-full text-sm font-500 border cursor-pointer ${filtroStatus === s ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200"}`}>
              {s === "todos" ? "Todos" : statusLabel[s]}
            </button>
          ))}
        </div>

        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 font-500">
                <th className="text-left px-6 py-3">Aluno</th>
                <th className="text-left px-4 py-3">Vencimento</th>
                <th className="text-right px-4 py-3">Valor</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-right px-6 py-3">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {doMes.map((p) => {
                const aluno = alunosFinanceiro.find((a) => a.id === p.alunoId)!;
                const linhaCor = p.status === "atrasado" ? "bg-red-50/40" : p.status === "pendente" ? "bg-amber-50/40" : "";
                return (
                  <>
                    <tr key={p.id} className={`border-b border-slate-50 hover:bg-slate-50 ${linhaCor}`}>
                      <td className="px-6 py-3">
                        <button onClick={() => setAlunoExpandido(alunoExpandido === aluno.id ? null : aluno.id)} className="flex items-center gap-3 cursor-pointer bg-transparent border-0 text-left">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-700">{aluno.avatar}</div>
                          <span className="text-sm font-600 text-slate-900">{aluno.name}</span>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">{p.dataVencimento}</td>
                      <td className="px-4 py-3 text-sm font-700 text-right text-slate-900">R$ {p.valorCobrado.toLocaleString("pt-BR")}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge label={statusLabel[p.status]} active={p.status === "pago"} color={statusColor[p.status]} /></td>
                      <td className="px-6 py-3 text-right">
                        {p.status !== "pago" ? (
                          <Btn variant={p.lembreteEnviadoEm ? "ghost" : "secondary"} size="sm" onClick={() => enviarLembrete(p.id)}>
                            {p.lembreteEnviadoEm ? "Lembrete enviado" : "Enviar lembrete"}
                          </Btn>
                        ) : (<span className="text-xs text-slate-400">-</span>)}
                      </td>
                    </tr>
                    {alunoExpandido === aluno.id && (
                      <tr>
                        <td colSpan={5} className="bg-slate-50 px-6 py-4">
                          <div className="text-xs font-600 text-slate-500 uppercase tracking-wide mb-2">Historico - {aluno.name}</div>
                          <div className="flex gap-3 flex-wrap">
                            {historicoDoAluno(aluno.id).map((h) => (
                              <div key={h.id} className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs">
                                <div className="font-600 text-slate-800">{h.referenciaMes}</div>
                                <div className="text-slate-500">R$ {h.valorCobrado}</div>
                                <StatusBadge label={statusLabel[h.status]} active={h.status === "pago"} color={statusColor[h.status]} />
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};
