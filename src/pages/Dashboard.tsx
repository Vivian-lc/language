import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useProgress } from '@/context/ProgressContext'
import { StatCard, ProgressBar, Badge } from '@/components/ui'
import { LANGUAGE_LIST, GOAL_LABELS } from '@/data/languages'
import { COURSES, getCoursesByLanguage } from '@/data/courses'
import { recommendPath } from '@/utils/recommendation'
import { todayStr } from '@/utils/storage'

export default function Dashboard() {
  const { user } = useAuth()
  const { stats } = useProgress()

  if (!user) return null

  const todayXp = stats.dailyXp.find((d) => d.date === todayStr())?.xp ?? 0
  const goalXp = user.dailyGoalXp
  const goalPct = Math.min(100, (todayXp / goalXp) * 100)

  const recs = recommendPath(user, stats)
  const unlockedCount = stats.achievements.length

  // Continue learning: first in-progress course
  const inProgress = COURSES.map((c) => {
    const done = c.lessons.filter((l) => stats.completedLessons.includes(l.id)).length
    return { course: c, done, total: c.lessons.length }
  }).filter((x) => x.done > 0 && x.done < x.total)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero banner */}
      <div className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-700 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 text-9xl opacity-10 select-none">🌍</div>
        <div className="relative">
          <div className="text-brand-100 text-sm">{greeting()}，{user.avatar}</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">{user.username}，继续你的语言旅程</h1>
          <p className="text-brand-100 text-sm mt-2">
            学习目标：{GOAL_LABELS[user.goal]} · 已坚持 {stats.streakDays} 天 · 累计 {stats.totalXp} XP
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {inProgress[0] ? (
              <Link to={`/courses/${inProgress[0].course.id}`} className="btn bg-white text-brand-700 hover:bg-brand-50">
                ▶ 继续学习「{inProgress[0].course.title}」
              </Link>
            ) : (
              <Link to="/courses" className="btn bg-white text-brand-700 hover:bg-brand-50">选择课程开始 →</Link>
            )}
            <Link to="/recommendations" className="btn bg-white/15 text-white border border-white/30 hover:bg-white/25">✨ 智能推荐</Link>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="🔥" label="连续学习" value={`${stats.streakDays} 天`} sub="保持节奏" />
        <StatCard icon="⭐" label="累计经验" value={`${stats.totalXp} XP`} sub={`今日 +${todayXp}`} />
        <StatCard icon="📚" label="完成课程" value={`${stats.completedLessons.length} 节`} sub="坚持就是胜利" />
        <StatCard icon="🏆" label="解锁成就" value={`${unlockedCount} 项`} sub={`掌握 ${stats.masteredWords.length} 词`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's goal */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-900">今日学习目标</h3>
              <p className="text-xs text-slate-500">每日坚持，进步看得见</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-brand-600">{todayXp}<span className="text-sm text-slate-400 font-normal">/{goalXp} XP</span></div>
            </div>
          </div>
          <ProgressBar value={todayXp} max={goalXp} height="h-3" />
          <div className="grid grid-cols-4 gap-2 mt-5">
            {[
              { to: '/vocabulary', icon: '🔤', label: '背单词' },
              { to: '/grammar', icon: '🧠', label: '练语法' },
              { to: '/listening', icon: '👂', label: '听力' },
              { to: '/speaking', icon: '🗣️', label: '口语' },
            ].map((a) => (
              <Link key={a.to} to={a.to} className="rounded-xl border border-slate-200 p-3 hover:border-brand-300 hover:bg-brand-50/30 transition text-center">
                <div className="text-2xl">{a.icon}</div>
                <div className="text-xs font-medium text-slate-700 mt-1">{a.label}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* My languages */}
        <div className="card p-5">
          <h3 className="font-bold text-slate-900 mb-3">我的语言</h3>
          <div className="space-y-3">
            {LANGUAGE_LIST.map((lang) => {
              const pct = stats.languageProgress[lang.code]
              const isInterest = user.interests.includes(lang.code)
              return (
                <div key={lang.code}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{lang.flag} {lang.name}</span>
                    <span className="text-slate-500">{pct}%</span>
                  </div>
                  <ProgressBar value={pct} color="bg-brand-500" height="h-1.5" />
                  {!isInterest && <div className="text-[10px] text-slate-400 mt-0.5">未加入兴趣</div>}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recommended path */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900">✨ 为你推荐的学习路径</h3>
          <Link to="/recommendations" className="text-sm text-brand-600 font-medium hover:underline">查看全部 →</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {recs.slice(0, 4).map((r, i) => (
            <div key={i} className="card p-4 flex items-start gap-3 hover:shadow-md transition">
              <div className="text-2xl">{r.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 text-sm">{r.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{r.reason}</div>
                {r.action && (
                  <Link to={r.action.to} className="inline-block mt-2 text-xs font-semibold text-brand-600 hover:underline">{r.action.label} →</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick language browse */}
      <div>
        <h3 className="font-bold text-slate-900 mb-3">按语言浏览课程</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {LANGUAGE_LIST.map((lang) => {
            const courses = getCoursesByLanguage(lang.code)
            return (
              <Link key={lang.code} to={`/courses?lang=${lang.code}`} className={`card p-4 bg-gradient-to-br ${lang.gradient} text-white hover:scale-[1.02] transition`}>
                <div className="text-3xl">{lang.flag}</div>
                <div className="font-bold mt-2">{lang.name} · {lang.nativeName}</div>
                <div className="text-xs opacity-90 mt-1 line-clamp-2">{lang.description}</div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge color="brand">{courses.length} 门分级课</Badge>
                  <Badge color="brand">{stats.languageProgress[lang.code]}%</Badge>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 6) return '夜深了'
  if (h < 11) return '早上好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
}
