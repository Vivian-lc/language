import { useState, useMemo } from 'react'
import { SpeakingPractice } from '@/components/practice/SpeakingPractice'
import { SPEAKING } from '@/data/listening-speaking'
import { LANGUAGE_LIST } from '@/data/languages'
import { useProgress } from '@/context/ProgressContext'
import { StatCard } from '@/components/ui'
import type { LanguageCode } from '@/types'

export default function Speaking() {
  const { stats } = useProgress()
  const [lang, setLang] = useState<LanguageCode>('en')

  const items = useMemo(() => SPEAKING.filter((s) => s.language === lang), [lang])
  const doneCount = items.filter((s) => stats.completedSpeaking.includes(s.id)).length

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">🗣️ 口语跟读</h1>
        <p className="text-sm text-slate-500 mt-1">听标准发音 · 麦克风跟读 · AI 评分，告别哑巴外语</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard icon="💬" label="跟读素材" value={items.length} sub={`${lang.toUpperCase()}`} />
        <StatCard icon="✓" label="已完成" value={doneCount} sub="累计" />
        <StatCard icon="🎤" label="完成度" value={items.length ? Math.round((doneCount / items.length) * 100) : 0} sub="%" />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500">语言</span>
        {LANGUAGE_LIST.map((l) => (
          <button key={l.code} onClick={() => setLang(l.code)} className={`pill ${lang === l.code ? 'active' : ''}`}>
            {l.flag} {l.name}
          </button>
        ))}
      </div>

      <SpeakingPractice items={items} />

      <style>{`.pill { padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 500; border: 1px solid #e2e8f0; background: white; color: #475569; transition: all .15s; } .pill:hover { border-color: #cbd5e1; } .pill.active { background: #1f56f0; color: white; border-color: #1f56f0; }`}</style>
    </div>
  )
}
