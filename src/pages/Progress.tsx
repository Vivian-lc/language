import { useAuth } from '@/context/AuthContext'
import { useProgress } from '@/context/ProgressContext'
import { COURSES } from '@/data/courses'
import { LANGUAGES, LEVEL_LABELS } from '@/data/languages'
import { StatCard, ProgressBar, EmptyState } from '@/components/ui'
import { Link } from 'react-router-dom'

export default function Progress() {
  const { user } = useAuth()
  const { stats, reset } = useProgress()

  if (!user) return null

  const todayXp = stats.dailyXp.find((d) => d.date === new Date().toISOString().slice(0, 10))?.xp ?? 0
  const recentDays = stats.dailyXp.slice(-14).reverse()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">📊 学习进度</h1>
          <p className="text-sm text-slate-500 mt-1">追踪你的每一步成长，数据本地保存，仅你可见</p>
        </div>
        <button onClick={() => { if (confirm('确定重置所有学习进度吗？此操作不可恢复')) reset() }} className="btn-ghost text-rose-600 hover:bg-rose-50">重置进度</button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="⭐" label="总经验" value={`${stats.totalXp}`} sub="XP" />
        <StatCard icon="🔥" label="连续天数" value={`${stats.streakDays}`} sub="天" />
        <StatCard icon="📚" label="完成课程" value={stats.completedLessons.length} sub="节" />
        <StatCard icon="🔤" label="掌握词汇" value={stats.masteredWords.length} sub="词" />
      </div>

      {/* Today */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-900">今日学习</h3>
          <span className="text-sm text-brand-600 font-semibold">{todayXp} / {user.dailyGoalXp} XP</span>
        </div>
        <ProgressBar value={todayXp} max={user.dailyGoalXp} height="h-3" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center">
          {[
            { label: '单词', count: stats.completedVocab.length, icon: '🔤' },
            { label: '语法', count: stats.completedGrammar.length, icon: '🧠' },
            { label: '听力', count: stats.completedListening.length, icon: '👂' },
            { label: '口语', count: stats.completedSpeaking.length, icon: '🗣️' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-slate-50 p-3">
              <div className="text-xl">{s.icon}</div>
              <div className="text-lg font-bold text-slate-900">{s.count}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* XP trend */}
      <div className="card p-5">
        <h3 className="font-bold text-slate-900 mb-4">近 14 天学习活跃度</h3>
        {recentDays.length === 0 ? (
          <EmptyState icon="📈" title="还没有学习记录" desc="完成一些练习后会在这里展示" />
        ) : (
          <div className="flex items-end gap-1.5 h-40">
            {recentDays.map((d) => {
              const max = Math.max(...recentDays.map((r) => r.xp), user.dailyGoalXp)
              const h = Math.max(4, (d.xp / max) * 100)
              const reached = d.xp >= user.dailyGoalXp
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center justify-end gap-1 group relative">
                  <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition">{d.xp}</div>
                  <div
                    className={`w-full rounded-t-md transition-all ${reached ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' : d.xp > 0 ? 'bg-gradient-to-t from-brand-500 to-brand-400' : 'bg-slate-200'}`}
                    style={{ height: `${h}%` }}
                  />
                  <div className="text-[9px] text-slate-400">{d.date.slice(5)}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Per-language progress */}
      <div className="card p-5">
        <h3 className="font-bold text-slate-900 mb-4">各语言学习进度</h3>
        <div className="space-y-4">
          {Object.values(LANGUAGES).map((lang) => {
            const courses = COURSES.filter((c) => c.language === lang.code)
            const totalLessons = courses.reduce((s, c) => s + c.lessons.length, 0)
            const doneLessons = courses.reduce((s, c) => s + c.lessons.filter((l) => stats.completedLessons.includes(l.id)).length, 0)
            const pct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0
            return (
              <div key={lang.code}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-semibold text-slate-800 text-sm">{lang.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{doneLessons}/{totalLessons} 节 · {pct}%</span>
                </div>
                <ProgressBar value={pct} height="h-2" />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {courses.map((c) => {
                    const cd = c.lessons.filter((l) => stats.completedLessons.includes(l.id)).length
                    const cpct = Math.round((cd / c.lessons.length) * 100)
                    return (
                      <Link key={c.id} to={`/courses/${c.id}`} className="text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-600 hover:bg-brand-50 hover:text-brand-700">
                        {LEVEL_LABELS[c.level].label} · {cpct}%
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
