import { useState } from "react";
import { Logo, Btn } from "./components/ui/DesignSystem";
import { PainelFinanceiroDono } from "./components/financeiro/PainelFinanceiroDono";
import { PainelFinanceiroAluno } from "./components/financeiro/PainelFinanceiroAluno";
import { PainelDespesas } from "./components/despesas/PainelDespesas";

// PREVIEW TEMPORARIO -- este App.tsx sera substituido quando o App.tsx
// original (Landing, Dashboard do motorista, tela mobile do aluno, etc.)
// for integrado. Veja INTEGRATION.md para o passo a passo completo.

const TELAS = [
  { id: "dono", label: "Financeiro (Dono)" },
  { id: "aluno", label: "Financeiro (Aluno)" },
  { id: "despesas", label: "Gastos da Van" },
];

export default function App() {
  const [tela, setTela] = useState("dono");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-white/10">
        <div className="flex items-center h-14 px-6 gap-6">
          <Logo dark />
          <div className="w-px h-5 bg-white/10" />
          <nav className="flex items-center gap-1 flex-1">
            {TELAS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTela(t.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-500 transition-all cursor-pointer border-0 ${
                  tela === t.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <span className="text-amber-400 text-xs font-600 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            PREVIEW - modulos novos (App completo em integracao)
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto bg-white shadow-sm my-6 rounded-2xl overflow-hidden" style={{ minHeight: "80vh" }}>
        {tela === "dono" && <PainelFinanceiroDono />}
        {tela === "aluno" && <PainelFinanceiroAluno />}
        {tela === "despesas" && <PainelDespesas />}
      </main>
    </div>
  );
}
