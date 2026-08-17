import { useState, useMemo } from 'react'
import type { VocabularyItem } from '@/types'
import { useProgress } from '@/context/ProgressContext'
import { EmptyState } from '@/components/ui'

/**
 * Interactive flashcard-based vocabulary memorization.
 * - Card flip to reveal meaning
 * - Mark "已掌握" to add to mastered words
 * - Spaced review style
 */
export function VocabularyPractice({ items }: { items: VocabularyItem[] }) {
  const { recordVocab, stats } = useProgress()
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [knownIds, setKnownIds] = useState<string[]>([])

  const item = items[idx]
  const total = items.length
  const done = knownIds.length

  const next = () => {
    setFlipped(false)
    setIdx((i) => (i + 1) % total)
  }
  const prev = () => {
    setFlipped(false)
    setIdx((i) => (i - 1 + total) % total)
  }

  const markKnown = () => {
    if (!item) return
    if (!knownIds.includes(item.id)) setKnownIds([...knownIds, item.id])
    recordVocab(item.id, 15, true)
    setTimeout(next, 200)
  }

  const markReview = () => {
    if (item) recordVocab(item.id, 5, false)
    setTimeout(next, 200)
  }

  if (!item) {
    return <EmptyState icon="📭" title="暂无词汇" desc="该课程暂未配置单词内容" />
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">单词 {idx + 1} / {total} · 已掌握 {done}</span>
        <span className="text-amber-600 font-semibold">每词 +15 XP</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${(done / total) * 100}%` }} />
      </div>

      {/* Flashcard */}
      <div className="relative h-72 sm:h-80 cursor-pointer" onClick={() => setFlipped((v) => !v)}>
        <div className={`absolute inset-0 transition-transform duration-500 preserve-3d ${flipped ? 'rotate-y' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
          {/* Front */}
          <div className="absolute inset-0 card p-6 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: 'hidden' }}>
            <div className="text-xs text-slate-400 mb-2">{item.partOfSpeech || '词汇'} · {item.level}</div>
            <div className="text-4xl font-extrabold text-slate-900">{item.word}</div>
            {item.phonetic && <div className="text-sm text-slate-500 mt-2">{item.phonetic}</div>}
            {item.romaji && <div className="text-sm text-brand-600 mt-2">{item.romaji}</div>}
            <div className="absolute bottom-4 text-xs text-slate-400">点击翻转查看释义 ↻</div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 card bg-brand-50/40 p-6 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="text-2xl font-bold text-brand-700">{item.meaning}</div>
            <div className="mt-4 text-sm text-slate-700 max-w-md">{item.example}</div>
            <div className="mt-1 text-xs text-slate-500">{item.exampleTranslation}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button onClick={prev} className="btn-ghost">← 上一词</button>
        <button onClick={markReview} className="btn-ghost flex-1">🔁 待复习</button>
        <button onClick={markKnown} className="btn-primary flex-1">✓ 已掌握</button>
        <button onClick={next} className="btn-ghost">下一词 →</button>
      </div>
      <div className="text-center text-xs text-slate-400">
        {stats.completedVocab.includes(item.id) ? '✓ 本词已学过' : '新词'}
      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; transition: transform 0.5s; }
        .rotate-y { transform: rotateY(180deg); }
      `}</style>
    </div>
  )
}

/** Standalone vocabulary browser that lets the user pick language + level */
export function useVocabFilter(items: VocabularyItem[]) {
  const [lang, setLang] = useState<string>('en')
  const [level, setLevel] = useState<string>('A1')
  const filtered = useMemo(
    () => items.filter((v) => v.language === lang && v.level === level),
    [items, lang, level],
  )
  return { lang, setLang, level, setLevel, filtered }
}
