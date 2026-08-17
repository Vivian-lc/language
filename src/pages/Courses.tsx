import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { COURSES } from '@/data/courses'
import { LANGUAGES, LEVEL_LABELS } from '@/data/languages'
import { useProgress } from '@/context/ProgressContext'
import { Badge, ProgressBar, EmptyState } from '@/components/ui'
import type { LanguageCode } from '@/types'

export default function Courses() {
  const [params, setParams] = useSearchParams()
  const lang = (params.get('lang') as LanguageCode | null) || 'all'
  const [level, setLevel] = useState<string>('all')

  const { stats } = useProgress()

  const filtered = useMemo(() => {
    return COURSES.filter((c) => (lang === 'all' || c.language === lang) && (level === 'all' || c.level === level))
  }, [lang, level])

  const setLang = (l: string) => {
    const next = new URLSearchParams(params)
    if (l === 'all') next.delete('lang')
    else next.set('lang', l)
    setParams(next, { replace: true })
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">分级课程体系</h1>
        <p className="text-sm text-slate-500 mt-1">从 A1 入门到 C2 精通，按 CEFR 国际标准分级，循序渐进</p>
      </div>

      {/* Filters */}
      <div className="card p-4 space-y-3">
        <div>
          <div className="text-xs text-slate-500 mb-2">语言</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setLang('all')} className={pill(lang === 'all')}>🌐 全部</button>
            {Object.values(LANGUAGES).map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)} className={pill(lang === l.code)}>
                {l.flag} {l.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-2">等级</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setLevel('all')} className={pill(level === 'all')}>全部等级</button>
            {Object.entries(LEVEL_LABELS).map(([lv, meta]) => (
              <button key={lv} onClick={() => setLevel(lv)} className={pill(level === lv)}>
                {lv} · {meta.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course list */}
      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="暂无符合条件的课程" desc="试试调整筛选条件" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((course) => {
            const lang = LANGUAGES[course.language]
            const done = course.lessons.filter((l) => stats.completedLessons.includes(l.id)).length
            const pct = Math.round((done / course.lessons.length) * 100)
            return (
              <Link key={course.id} to={`/courses/${course.id}`} className="card p-5 hover:shadow-md hover:border-brand-300 transition block">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lang.gradient} flex items-center justify-center text-2xl`}>{lang.flag}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge color="brand">{course.level}</Badge>
                        <span className="text-xs text-slate-500">{LEVEL_LABELS[course.level].label}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mt-1">{course.title}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">进度</div>
                    <div className="font-bold text-brand-600">{pct}%</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-3 line-clamp-2">{course.description}</p>
                <div className="mt-3">
                  <ProgressBar value={done} max={course.lessons.length} height="h-1.5" />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span>📖 {course.lessons.length} 节课</span>
                    <span>⏱️ 约 {course.estimatedHours} 小时</span>
                  </div>
                  <div className="flex gap-1">
                    {course.tags.slice(0, 2).map((t) => (
                      <Badge key={t} color="slate">{t}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

function pill(active: boolean): string {
  return `px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
    active ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
  }`
}
