import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Btn, Card } from "../ui/DesignSystem";
import { despesasVan as despesasSeed, KM_RODADO_MES } from "../../data/mockDataFinanceiro";
import { CATEGORIAS_DESPESA } from "../../types/financeiro";
import type { CategoriaDespesa, DespesaVan } from "../../types/financeiro";

const RECEITA_MES_ATUAL = 2400;

function exportarCsvDespesas(despesas: DespesaVan[]) {
  const linhas = [
    ["Data", "Categoria", "Descricao", "Valor", "KM no momento"].join(";"),
    ...despesas.map((d) => [d.data, d.categoria, d.descricao, d.valor.toFixed(2), d.kmNoMomento ?? ""].join(";")),
  ];
  const blob = new Blob([linhas.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "relatorio-despesas-van.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export const PainelDespesas = () => {
  const [despesas, setDespesas] = useState<DespesaVan[]>(despesasSeed);
  const [periodo, setPeriodo] = useState<"7d" | "30d" | "tudo">("30d");
  const [showForm, setShowForm] = useState(false);

  const [categoria, setCategoria] = useState<CategoriaDespesa>("combustivel");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("2026-09-11");
  const [km, setKm] = useState("");

  const filtradas = useMemo(() => {
    if (periodo === "tudo") return despesas;
    const hoje = new Date("2026-09-11");
    const limite = new Date(hoje);
    limite.setDate(limite.getDate() - (periodo === "7d" ? 7 : 30));
    return despesas.filter((d) => new Date(d.data) >= limite);
  }, [despesas, periodo]);

  const totalGeral = filtradas.reduce((a, d) => a + d.valor, 0);
  const custoPorKm = KM_RODADO_MES > 0 ? totalGeral / KM_RODADO_MES : 0;

  const porCategoria = CATEGORIAS_DESPESA.map((c) => ({
    name: c.label,
    value: filtradas.filter((d) => d.categoria === c.id).reduce((a, d) => a + d.valor, 0),
    color: c.cor,
  })).filter((c) => c.value > 0);

  const evolucaoMensal = [
    { mes: "Jul", despesa: 890 },
    { mes: "Ago", despesa: 1120 },
    { mes: "Set", despesa: totalGeral },
  ];

  const receitaVsDespesa = [{ mes: "Set", receita: RECEITA_MES_ATUAL, despesa: totalGeral }];

  const adicionarDespesa = () => {
    if (!descricao || !valor) return;
    const nova: DespesaVan = {
      id: `d${despesas.length + 1}`,
      categoria,
      descricao,
      valor: parseFloat(valor.replace(",", ".")),
      data,
      kmNoMomento: km ? Number(km) : undefined,
    };
    setDespesas((prev) => [nova, ...prev]);
    setDescricao("");
    setValor("");
    setKm("");
    setShowForm(false);
  };

  return (
    <>
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Gastos da Van</h1>
          <p className="text-sm text-slate-500">Combustivel, pedagio, manutencao e mais</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-full p-1 gap-1">
            {([["7d", "7 dias"], ["30d", "30 dias"], ["tudo", "Tudo"]] as const).map(([id, label]) => (
              <button key={id} onClick={() => setPeriodo(id)} className={`px-4 py-1 rounded-full text-sm font-500 cursor-pointer border-0 ${periodo === id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{label}</button>
            ))}
          </div>
          <Btn variant="secondary" size="sm" onClick={() => exportarCsvDespesas(filtradas)}>Exportar</Btn>
          <Btn variant="primary" size="sm" onClick={() => setShowForm(true)}>+ Novo gasto</Btn>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total no periodo", value: `R$ ${totalGeral.toLocaleString("pt-BR")}`, color: "text-red-600" },
            { label: "Custo por km rodado", value: `R$ ${custoPorKm.toFixed(2)}`, color: "text-slate-900" },
            { label: "Receita do mes", value: `R$ ${RECEITA_MES_ATUAL.toLocaleString("pt-BR")}`, color: "text-green-600" },
            { label: "Lucro liquido estimado", value: `R$ ${(RECEITA_MES_ATUAL - totalGeral).toLocaleString("pt-BR")}`, color: RECEITA_MES_ATUAL - totalGeral >= 0 ? "text-green-600" : "text-red-600" },
          ].map(({ label, value, color }) => (
            <Card key={label} className="p-5">
              <div className="text-xs text-slate-500 mb-2">{label}</div>
              <div className={`text-2xl font-700 ${color}`}>{value}</div>
            </Card>
          ))}
        </div>

        {showForm && (
          <Card className="p-6 mb-6 border-blue-200 bg-blue-50/30">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-700 text-slate-900">Novo gasto</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 cursor-pointer bg-transparent border-0 text-lg">x</button>
            </div>
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div>
                <label className="text-xs font-600 text-slate-600 mb-1 block">Categoria</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value as CategoriaDespesa)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white">
                  {CATEGORIAS_DESPESA.map((c) => (<option key={c.id} value={c.id}>{c.label}</option>))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-600 text-slate-600 mb-1 block">Descricao</label>
                <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Abastecimento posto X" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="text-xs font-600 text-slate-600 mb-1 block">Valor (R$)</label>
                <input value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="text-xs font-600 text-slate-600 mb-1 block">Data</label>
                <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div>
                <label className="text-xs font-600 text-slate-600 mb-1 block">KM no momento (opcional)</label>
                <input value={km} onChange={(e) => setKm(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-600 text-slate-600 mb-1 block">Comprovante (opcional)</label>
                <input type="file" className="text-sm text-slate-600" />
              </div>
            </div>
            <div className="flex gap-3">
              <Btn variant="primary" size="sm" onClick={adicionarDespesa}>Salvar gasto</Btn>
              <Btn variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancelar</Btn>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="font-700 text-slate-900 mb-4">Gastos por categoria</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={porCategoria} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {porCategoria.map((entry) => (<Cell key={entry.name} fill={entry.color} />))}
                </Pie>
                <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="font-700 text-slate-900 mb-4">Evolucao mensal de despesas</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={evolucaoMensal}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                <Bar dataKey="despesa" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="font-700 text-slate-900 mb-4">Receita vs. despesa - setembro/2026</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={receitaVsDespesa} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="mes" />
              <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
              <Legend />
              <Bar dataKey="receita" fill="#1A3FD4" radius={[0, 6, 6, 0]} />
              <Bar dataKey="despesa" fill="#EF4444" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 font-500">
                <th className="text-left px-6 py-3">Descricao</th>
                <th className="text-left px-4 py-3">Categoria</th>
                <th className="text-left px-4 py-3">Data</th>
                <th className="text-right px-6 py-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((d) => {
                const cat = CATEGORIAS_DESPESA.find((c) => c.id === d.categoria)!;
                return (
                  <tr key={d.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-3 text-sm text-slate-800">{d.descricao}</td>
                    <td className="px-4 py-3"><span className="text-xs font-500 px-2 py-0.5 rounded-full" style={{ background: `${cat.cor}1A`, color: cat.cor }}>{cat.label}</span></td>
                    <td className="px-4 py-3 text-sm text-slate-500">{d.data}</td>
                    <td className="px-6 py-3 text-sm font-700 text-right text-red-600">-R$ {d.valor.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};
