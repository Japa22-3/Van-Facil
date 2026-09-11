import type { ReactNode } from "react";

export const Logo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="6" width="13" height="8" rx="2" fill="white" />
        <rect x="14" y="8" width="3" height="4" rx="1" fill="white" opacity="0.7" />
        <circle cx="4" cy="14" r="1.5" fill="#10B981" />
        <circle cx="10" cy="14" r="1.5" fill="#10B981" />
      </svg>
    </div>
    <span style={{ fontFamily: "'DM Sans', sans-serif" }} className={`text-xl font-700 tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
      Van<span className={dark ? "text-blue-400" : "text-blue-600"}>Facil</span>
    </span>
  </div>
);

export const Btn = ({ children, variant = "primary", size = "md", onClick, className = "", disabled = false }: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "green" | "danger" | "outline-dark";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  const base = "inline-flex items-center justify-center font-500 rounded-full transition-all duration-150 cursor-pointer border-0 outline-none disabled:opacity-50";
  const sizes = { sm: "px-4 py-1.5 text-sm", md: "px-6 py-2.5 text-sm", lg: "px-8 py-3.5 text-base" };
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    green: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
    danger: "bg-red-500 text-white hover:bg-red-600",
    "outline-dark": "bg-transparent text-white border border-white/30 hover:bg-white/10",
  };
  return (
    <button disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string; onClick?: () => void }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>{children}</div>
);

export const StatusBadge = ({ label, active = true, color }: { label: string; active?: boolean; color?: "blue" | "yellow" | "red" }) => {
  const colors = { blue: "bg-blue-50 text-blue-700", yellow: "bg-amber-50 text-amber-700", red: "bg-red-50 text-red-700" };
  const dots = { blue: "bg-blue-500", yellow: "bg-amber-400", red: "bg-red-500" };
  const cls = color ? colors[color] : active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500";
  const dot = color ? dots[color] : active ? "bg-green-500" : "bg-slate-400";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-500 ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

export const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors cursor-pointer border-0 relative flex-shrink-0 ${value ? "bg-blue-600" : "bg-slate-300"}`}>
    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
  </button>
);
