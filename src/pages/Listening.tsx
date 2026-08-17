import { useState, useMemo } from 'react'
import { ListeningPractice } from '@/components/practice/ListeningPractice'
import { LISTENING } from '@/data/listening-speaking'
import { LANGUAGE_LIST } from '@/data/languages'
import { useProgress } from '@/context/ProgressContext'
import { StatCard } from '@/components/ui'
import type { LanguageCode } from '@/types'

export default function Listening() {
  const { stats } = useProgress()
  const [lang, setLang] = useState<LanguageCode>('en')

  const items = useMemo(() => LISTENING.filter((l) => l.language === lang), [lang])
  const doneCount = items.filter((l) => stats.completedListening.includes(l.id)).length

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">👂 听力训练</h1>
        <p className="text-sm text-slate-500 mt-1">AI 语音合成 · 慢速对照 · 填空理解，磨出敏锐语感</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard icon="🎧" label="听力素材" value={items.length} sub={`${lang.toUpperCase()}`} />
        <StatCard icon="✓" label="已完成" value={doneCount} sub="累计" />
        <StatCard icon="⏱️" label="总时长" value={`${items.reduce((s, i) => s + i.durationSec, 0)}s`} sub="素材时长" />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500">语言</span>
        {LANGUAGE_LIST.map((l) => (
          <button key={l.code} onClick={() => setLang(l.code)} className={`pill ${lang === l.code ? 'active' : ''}`}>
            {l.flag} {l.name}
          </button>
        ))}
      </div>

      <ListeningPractice items={items} />

      <style>{`.pill { padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 500; border: 1px solid #e2e8f0; background: white; color: #475569; transition: all .15s; } .pill:hover { border-color: #cbd5e1; } .pill.active { background: #1f56f0; color: white; border-color: #1f56f0; }`}</style>
    </div>
  )
}
