import type { ReactNode } from 'react'

export function ProgressBar({
  value,
  max = 100,
  color = 'bg-brand-500',
  height = 'h-2',
  showLabel = false,
}: {
  value: number
  max?: number
  color?: string
  height?: string
  showLabel?: boolean
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden`}>
        <div
          className={`${color} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && <div className="mt-1 text-xs text-slate-500">{Math.round(pct)}%</div>}
    </div>
  )
}

export function Badge({ children, color = 'slate' }: { children: ReactNode; color?: 'slate' | 'brand' | 'green' | 'amber' | 'rose' }) {
  const colors: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-600',
    brand: 'bg-brand-50 text-brand-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    rose: 'bg-rose-50 text-rose-700',
  }
  return <span className={`chip ${colors[color]}`}>{children}</span>
}

export function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-brand-50 text-xl flex items-center justify-center">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-lg font-bold text-slate-900 leading-tight">{value}</div>
        {sub && <div className="text-[11px] text-slate-400 truncate">{sub}</div>}
      </div>
    </div>
  )
}

export function EmptyState({ icon, title, desc, action }: { icon: string; title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-base font-semibold text-slate-800">{title}</div>
      {desc && <div className="text-sm text-slate-500 mt-1">{desc}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
