import { useAuth } from '@/context/AuthContext'
import { useProgress } from '@/context/ProgressContext'
import { recommendPath, weeklyPlan } from '@/utils/recommendation'
import { LANGUAGES, GOAL_LABELS } from '@/data/languages'
import { Link } from 'react-router-dom'

const TYPE_LABEL: Record<string, { label: string; color: string }> = {
  course: { label: '继续课程', color: 'bg-brand-50 text-brand-700' },
  review: { label: '复习巩固', color: 'bg-amber-50 text-amber-700' },
  'new-skill': { label: '新技能', color: 'bg-emerald-50 text-emerald-700' },
  streak: { label: '习惯养成', color: 'bg-rose-50 text-rose-700' },
}

export default function Recommendations() {
  const { user } = useAuth()
  const { stats } = useProgress()

  if (!user) return null
  const recs = recommendPath(user, stats)
  const plan = weeklyPlan(stats, user.dailyGoalXp)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">✨ 个性化学习推荐</h1>
        <p className="text-sm text-slate-500 mt-1">
          基于你的学习目标（{GOAL_LABELS[user.goal]}）、兴趣语言与学习进度，智能生成专属学习路径
        </p>
      </div>

      {/* User profile summary */}
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{user.avatar}</div>
          <div className="flex-1">
            <div className="font-bold text-slate-900">{user.username}</div>
            <div className="text-xs text-slate-500">{GOAL_LABELS[user.goal]} · 每日目标 {user.dailyGoalXp} XP</div>
          </div>
          <div className="flex gap-2">
            {user.interests.map((code) => (
              <span key={code} className="chip bg-brand-50 text-brand-700">{LANGUAGES[code].flag} {LANGUAGES[code].name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="font-bold text-slate-900 mb-3">为你定制的学习路径</h3>
        <div className="space-y-3">
          {recs.map((r, i) => {
            const meta = TYPE_LABEL[r.type] || { label: '推荐', color: 'bg-slate-100 text-slate-700' }
            return (
              <div key={i} className="card p-4 flex items-start gap-4 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-2xl shrink-0">{r.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`chip ${meta.color}`}>{meta.label}</span>
                    <span className="text-[10px] text-slate-400">优先级 {'★'.repeat(Math.ceil(r.priority / 20))}</span>
                  </div>
                  <div className="font-semibold text-slate-900 mt-1">{r.title}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{r.reason}</div>
                </div>
                {r.action && (
                  <Link to={r.action.to} className="btn-soft shrink-0">{r.action.label}</Link>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Weekly plan */}
      <div className="card p-5">
        <h3 className="font-bold text-slate-900 mb-1">本周学习计划</h3>
        <p className="text-xs text-slate-500 mb-4">基于每日目标 {user.dailyGoalXp} XP 生成</p>
        <div className="grid grid-cols-7 gap-2">
          {plan.map((d, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-slate-500 mb-1">{d.day}</div>
              <div
                className={`h-20 rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition ${
                  d.reached ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : d.xp > 0 ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-50 text-slate-400 border border-slate-100'
                }`}
              >
                <div className="text-lg">{d.reached ? '✓' : d.xp > 0 ? '⚡' : '○'}</div>
                <div>{d.xp}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-slate-500 flex items-center gap-4">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-200 inline-block" /> 已达标</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-200 inline-block" /> 进行中</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-200 inline-block" /> 未开始</span>
        </div>
      </div>
    </div>
  )
}
