import { useState, useRef, useEffect } from 'react'
import type { SpeakingItem } from '@/types'
import { useProgress } from '@/context/ProgressContext'
import { EmptyState, Badge } from '@/components/ui'

/**
 * Interactive speaking / read-along practice:
 * - Plays native pronunciation via Web Speech API
 * - Records user's microphone and gives a simulated pronunciation score
 * - Shadow-read along with the model
 */
export function SpeakingPractice({ items }: { items: SpeakingItem[] }) {
  const { recordSpeaking, stats } = useProgress()
  const [activeId, setActiveId] = useState(items[0]?.id)
  const active = items.find((i) => i.id === activeId) ?? items[0]

  if (!active) return <EmptyState icon="📭" title="暂无口语内容" desc="该课程暂未配置口语素材" />

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const done = stats.completedSpeaking.includes(it.id)
          return (
            <button
              key={it.id}
              onClick={() => setActiveId(it.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                it.id === active.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {done && '✓ '}{it.context}
            </button>
          )
        })}
      </div>
      <SpeakingCard item={active} onComplete={(xp) => recordSpeaking(active.id, xp)} completed={stats.completedSpeaking.includes(active.id)} />
    </div>
  )
}

function SpeakingCard({ item, onComplete, completed }: { item: SpeakingItem; onComplete: (xp: number) => void; completed: boolean }) {
  const [listening, setListening] = useState(false)
  const [recording, setRecording] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const langVoiceMap: Record<string, string> = { en: 'en-US', ja: 'ja-JP', ko: 'ko-KR' }

  const playModel = () => {
    if (!('speechSynthesis' in window)) {
      alert('当前浏览器不支持语音合成')
      return
    }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(item.phrase)
    u.lang = langVoiceMap[item.language] || 'en-US'
    u.rate = 0.85
    setListening(true)
    u.onend = () => setListening(false)
    window.speechSynthesis.speak(u)
  }

  const startRecord = async () => {
    setScore(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      chunksRef.current = []
      mr.ondataavailable = (e) => chunksRef.current.push(e.data)
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        // Simulated pronunciation score: based on phrase length + a bit of randomness
        const base = Math.min(98, 70 + item.phrase.length * 0.6)
        const jitter = Math.random() * 12
        const finalScore = Math.round(Math.min(100, base + jitter))
        setScore(finalScore)
        if (finalScore >= 60 && !completed) onComplete(30)
      }
      mr.start()
      mediaRef.current = mr
      setRecording(true)
      // auto stop after phrase duration
      setTimeout(() => stopRecord(), Math.min(6000, 1500 + item.phrase.length * 90))
    } catch {
      // Microphone denied - simulate a passing score anyway so the user can complete
      setScore(Math.round(75 + Math.random() * 20))
      if (!completed) onComplete(30)
    }
  }

  const stopRecord = () => {
    if (mediaRef.current && mediaRef.current.state !== 'inactive') {
      mediaRef.current.stop()
    }
    setRecording(false)
  }

  useEffect(() => {
    return () => {
      if (mediaRef.current && mediaRef.current.state !== 'inactive') mediaRef.current.stop()
    }
  }, [item.id])

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge color="brand">{item.level}</Badge>
            <Badge color="amber">{item.context}</Badge>
          </div>
          <h3 className="font-bold text-slate-900 text-lg">口语跟读训练</h3>
        </div>
        <div className="text-amber-600 text-sm font-semibold">完成 +30 XP</div>
      </div>

      {/* Phrase card */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-5 text-center">
        <div className="text-2xl font-extrabold text-slate-900">{item.phrase}</div>
        {item.phonetic && <div className="text-sm text-slate-500 mt-2">{item.phonetic}</div>}
        {item.romaji && <div className="text-sm text-brand-600 mt-2">{item.romaji}</div>}
        <div className="text-sm text-slate-600 mt-3">{item.translation}</div>
      </div>

      {/* Controls */}
      <div className="grid sm:grid-cols-2 gap-3">
        <button onClick={playModel} className="btn-soft">
          {listening ? '🔊 播放中...' : '🎧 听标准发音'}
        </button>
        {!recording ? (
          <button onClick={startRecord} className="btn-primary">
            🎤 开始跟读
          </button>
        ) : (
          <button onClick={stopRecord} className="btn bg-rose-600 text-white hover:bg-rose-700">
            ⏹ 结束录音
          </button>
        )}
      </div>

      {/* Recording visualization */}
      {recording && (
        <div className="rounded-xl bg-rose-50 p-4 text-center">
          <div className="flex items-center justify-center gap-1 h-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-rose-500 rounded-full"
                style={{ height: `${10 + Math.random() * 30}px`, animation: `mic-pulse 0.${(i % 5) + 2}s ease-in-out infinite alternate` }}
              />
            ))}
          </div>
          <div className="text-xs text-rose-600 mt-2">正在录音，请朗读上方短语...</div>
          <style>{`@keyframes mic-pulse { from { height: 8px; } to { height: 36px; } }`}</style>
        </div>
      )}

      {/* Score */}
      {score !== null && (
        <div className="rounded-xl border border-slate-200 p-4 animate-pop">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">发音评分</span>
            <span className={`text-2xl font-extrabold ${score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>{score}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${score}%` }} />
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {score >= 80 ? '🎉 发音非常标准！继续保持' : score >= 60 ? '👍 不错，再听一遍标准发音并多跟读几遍' : '💪 别灰心，建议反复跟读标准发音'}
          </div>
        </div>
      )}

      {completed && <div className="text-center text-xs text-emerald-600">✓ 已完成本口语练习</div>}
    </div>
  )
}
