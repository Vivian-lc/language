import { useState, useRef, useEffect } from 'react'
import type { ListeningItem } from '@/types'
import { useProgress } from '@/context/ProgressContext'
import { EmptyState, Badge } from '@/components/ui'

const DIFFICULTY_LABEL = { 1: '入门', 2: '进阶', 3: '挑战' }

/**
 * Interactive listening training:
 * - Uses Web Speech API to synthesize the text (no audio files needed)
 * - Play / pause / slow speed
 * - Hide/show translation toggle
 * - Fill-in-the-blank comprehension check
 */
export function ListeningPractice({ items }: { items: ListeningItem[] }) {
  const { recordListening, stats } = useProgress()
  const [activeId, setActiveId] = useState(items[0]?.id)
  const active = items.find((i) => i.id === activeId) ?? items[0]

  if (!active) return <EmptyState icon="📭" title="暂无听力内容" desc="该课程暂未配置听力素材" />

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const done = stats.completedListening.includes(it.id)
          return (
            <button
              key={it.id}
              onClick={() => setActiveId(it.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                it.id === active.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {done && '✓ '}{it.title}
            </button>
          )
        })}
      </div>
      <ListeningCard item={active} onComplete={(xp) => recordListening(active.id, xp)} completed={stats.completedListening.includes(active.id)} />
    </div>
  )
}

function ListeningCard({ item, onComplete, completed }: { item: ListeningItem; onComplete: (xp: number) => void; completed: boolean }) {
  const [playing, setPlaying] = useState(false)
  const [slow, setSlow] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showTrans, setShowTrans] = useState(false)
  const [blankAnswer, setBlankAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  const langVoiceMap: Record<string, string> = { en: 'en-US', ja: 'ja-JP', ko: 'ko-KR' }

  useEffect(() => {
    return () => {
      if (playing) window.speechSynthesis.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id])

  const play = () => {
    if (!('speechSynthesis' in window)) {
      alert('当前浏览器不支持语音合成，请使用 Chrome / Edge / Safari')
      return
    }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(item.text)
    u.lang = langVoiceMap[item.language] || 'en-US'
    u.rate = slow ? 0.6 : 1
    u.onend = () => {
      setPlaying(false)
      if (!completed) onComplete(30)
    }
    utterRef.current = u
    window.speechSynthesis.speak(u)
    setPlaying(true)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setPlaying(false)
  }

  // Comprehension: pick a keyword from text to blank-fill
  const words = item.text.split(/\s+/).filter((w) => w.length > 3)
  const targetIdx = Math.floor(words.length / 2)
  const target = words[targetIdx]?.replace(/[^a-zA-Z\u3040-\u30ff\uac00-\ud7af]/g, '') || ''
  const blanked = item.text.replace(target, '_____')

  const check = () => {
    setChecked(true)
    const normalized = blankAnswer.trim().toLowerCase().replace(/[.,!?]/g, '')
    if (normalized === target.toLowerCase() && !completed) onComplete(15)
  }

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge color="brand">{item.level}</Badge>
            <Badge color="amber">难度 {DIFFICULTY_LABEL[item.difficulty]}</Badge>
            <span className="text-xs text-slate-400">{item.topic} · {item.durationSec}s</span>
          </div>
          <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
        </div>
        <div className="text-amber-600 text-sm font-semibold">听力 +30 XP · 填空 +15 XP</div>
      </div>

      {/* Player */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6 text-center">
        <div className="text-5xl mb-2">{playing ? '🎧' : '🔊'}</div>
        <div className="text-sm text-slate-300">{playing ? '播放中...' : '点击播放开始听力训练'}</div>
        {/* Animated bars */}
        <div className="flex items-end justify-center gap-1 h-10 mt-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-brand-400 rounded-full"
              style={{
                height: playing ? `${20 + Math.abs(Math.sin((Date.now() / 200) + i)) * 24}px` : '6px',
                transition: 'height 0.2s',
                animation: playing ? `pulse-bar 0.${(i % 8) + 2}s ease-in-out infinite alternate` : 'none',
              }}
            />
          ))}
        </div>
        <style>{`@keyframes pulse-bar { from { height: 6px; } to { height: 32px; } }`}</style>

        <div className="flex items-center justify-center gap-2 mt-4">
          {!playing ? (
            <button onClick={play} className="btn bg-white text-slate-900 hover:bg-slate-100">▶ 播放</button>
          ) : (
            <button onClick={stop} className="btn bg-white text-slate-900 hover:bg-slate-100">⏹ 停止</button>
          )}
          <button onClick={() => setSlow((v) => !v)} className={`btn ${slow ? 'bg-amber-400 text-white' : 'bg-white/15 text-white border border-white/30'}`}>
            🐢 慢速
          </button>
        </div>
      </div>

      {/* Text & translation */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <button onClick={() => setShowText((v) => !v)} className="text-sm text-brand-600 font-medium hover:underline">
            {showText ? '🙈 隐藏原文' : '👁 查看听力原文'}
          </button>
          <button onClick={() => setShowTrans((v) => !v)} className="text-sm text-brand-600 font-medium hover:underline">
            {showTrans ? '🙈 隐藏译文' : '🇨🇳 查看中文译文'}
          </button>
        </div>
        {showText && <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-800 leading-relaxed">{item.text}</div>}
        {showTrans && <div className="rounded-xl bg-brand-50/50 p-3 text-sm text-slate-700 leading-relaxed">{item.translation}</div>}
      </div>

      {/* Comprehension fill-in-the-blank */}
      <div className="rounded-xl border border-slate-200 p-4">
        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">听力理解 · 填空</div>
        <div className="text-sm text-slate-700 leading-relaxed">{blanked}</div>
        <div className="flex items-center gap-2 mt-3">
          <input
            className="input flex-1"
            placeholder="填入听到的单词..."
            value={blankAnswer}
            onChange={(e) => setBlankAnswer(e.target.value)}
            disabled={checked}
          />
          {!checked ? (
            <button onClick={check} className="btn-primary">检查</button>
          ) : (
            <button onClick={() => { setChecked(false); setBlankAnswer('') }} className="btn-ghost">重试</button>
          )}
        </div>
        {checked && (
          <div className={`mt-2 text-sm ${blankAnswer.trim().toLowerCase() === target.toLowerCase() ? 'text-emerald-600' : 'text-rose-600'}`}>
            {blankAnswer.trim().toLowerCase() === target.toLowerCase() ? '✓ 正确！' : `✗ 正确答案：${target}`}
          </div>
        )}
      </div>

      {completed && <div className="text-center text-xs text-emerald-600">✓ 已完成本听力训练</div>}
    </div>
  )
}
