import { useState, useMemo } from 'react'
import { VocabularyPractice } from '@/components/practice/VocabularyPractice'
import { VOCABULARY } from '@/data/vocabulary'
import { LANGUAGE_LIST, LEVEL_LABELS } from '@/data/languages'
import { useProgress } from '@/context/ProgressContext'
import { StatCard } from '@/components/ui'
import type { LanguageCode, Level } from '@/types'

export default function Vocabulary() {
  const { stats } = useProgress()
  const [lang, setLang] = useState<LanguageCode>('en')
  const [level, setLevel] = useState<Level>('A1')

  const items = useMemo(() => VOCABULARY.filter((v) => v.language === lang && v.level === level), [lang, level])
  const masteredCount = items.filter((v) => stats.masteredWords.includes(v.id)).length

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">🔤 单词记忆</h1>
        <p className="text-sm text-slate-500 mt-1">翻卡式记忆 · 标记掌握 · 重复巩固，让词汇刻进长期记忆</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard icon="📚" label="已学单词" value={stats.completedVocab.length} sub="累计" />
        <StatCard icon="✓" label="已掌握" value={stats.masteredWords.length} sub="牢记" />
        <StatCard icon="🎯" label="本组进度" value={`${masteredCount}/${items.length}`} sub={`${lang.toUpperCase()} ${level}`} />
      </div>

      {/* Pickers */}
      <div className="card p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">语言</span>
          <div className="flex gap-1">
            {LANGUAGE_LIST.map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)} className={`pill ${lang === l.code ? 'active' : ''}`}>
                {l.flag} {l.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">等级</span>
          <div className="flex flex-wrap gap-1">
            {Object.keys(LEVEL_LABELS).filter((lv) => ['A1', 'A2', 'B1'].includes(lv)).map((lv) => (
              <button key={lv} onClick={() => setLevel(lv as Level)} className={`pill ${level === lv ? 'active' : ''}`}>{lv}</button>
            ))}
          </div>
        </div>
      </div>

      <VocabularyPractice items={items} />

      <style>{`.pill { padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 500; border: 1px solid #e2e8f0; background: white; color: #475569; transition: all .15s; } .pill:hover { border-color: #cbd5e1; } .pill.active { background: #1f56f0; color: white; border-color: #1f56f0; }`}</style>
    </div>
  )
}
