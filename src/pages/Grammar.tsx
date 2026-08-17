import { useState, useMemo } from 'react'
import { GrammarPractice } from '@/components/practice/GrammarPractice'
import { GRAMMAR } from '@/data/grammar'
import { LANGUAGE_LIST } from '@/data/languages'
import { useProgress } from '@/context/ProgressContext'
import { StatCard } from '@/components/ui'
import type { LanguageCode } from '@/types'

export default function Grammar() {
  const { stats } = useProgress()
  const [lang, setLang] = useState<LanguageCode>('en')

  const rules = useMemo(() => GRAMMAR.filter((g) => g.language === lang), [lang])
  const doneCount = rules.filter((g) => stats.completedGrammar.includes(g.id)).length

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">🧠 语法练习</h1>
        <p className="text-sm text-slate-500 mt-1">规则讲解 + 例句 + 随堂测验，吃透核心语法点</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard icon="🧩" label="语法规则" value={rules.length} sub={`${lang.toUpperCase()}`} />
        <StatCard icon="✓" label="已完成" value={doneCount} sub="累计掌握" />
        <StatCard icon="⭐" label="累计经验" value={`${stats.totalXp}`} sub="XP" />
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500">语言</span>
        {LANGUAGE_LIST.map((l) => (
          <button key={l.code} onClick={() => setLang(l.code)} className={`pill ${lang === l.code ? 'active' : ''}`}>
            {l.flag} {l.name}
          </button>
        ))}
      </div>

      <GrammarPractice rules={rules} />

      <style>{`.pill { padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 500; border: 1px solid #e2e8f0; background: white; color: #475569; transition: all .15s; } .pill:hover { border-color: #cbd5e1; } .pill.active { background: #1f56f0; color: white; border-color: #1f56f0; }`}</style>
    </div>
  )
}
