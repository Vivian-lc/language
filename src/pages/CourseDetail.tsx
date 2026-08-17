import { useParams, Link } from 'react-router-dom'
import { getCourseById } from '@/data/courses'
import { LANGUAGES, LEVEL_LABELS } from '@/data/languages'
import { useProgress } from '@/context/ProgressContext'
import { Badge, ProgressBar, EmptyState } from '@/components/ui'

const TYPE_META: Record<string, { icon: string; label: string; color: string }> = {
  vocabulary: { icon: '🔤', label: '单词记忆', color: 'bg-blue-50 text-blue-700' },
  grammar: { icon: '🧠', label: '语法练习', color: 'bg-purple-50 text-purple-700' },
  listening: { icon: '👂', label: '听力训练', color: 'bg-emerald-50 text-emerald-700' },
  speaking: { icon: '🗣️', label: '口语跟读', color: 'bg-amber-50 text-amber-700' },
}

export default function CourseDetail() {
  const { courseId = '' } = useParams()
  const course = getCourseById(courseId)
  const { stats } = useProgress()

  if (!course) {
    return <EmptyState icon="❓" title="课程不存在" desc="可能链接已失效" action={<Link to="/courses" className="btn-primary">返回课程列表</Link>} />
  }

  const lang = LANGUAGES[course.language]
  const done = course.lessons.filter((l) => stats.completedLessons.includes(l.id)).length
  const pct = Math.round((done / course.lessons.length) * 100)

  return (
    <div className="space-y-5 animate-fade-in">
      <Link to="/courses" className="text-sm text-slate-500 hover:text-brand-600">← 返回课程列表</Link>

      {/* Course header */}
      <div className={`rounded-3xl bg-gradient-to-br ${lang.gradient} text-white p-6 sm:p-8 relative overflow-hidden`}>
        <div className="absolute -right-6 -top-6 text-9xl opacity-10">{lang.flag}</div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{lang.flag}</span>
            <Badge color="brand">{course.level} · {LEVEL_LABELS[course.level].label}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">{course.title}</h1>
          <p className="text-white/90 text-sm mt-2 max-w-2xl">{course.description}</p>
          <div className="mt-5 max-w-md">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>课程进度</span>
              <span>{done}/{course.lessons.length} · {pct}%</span>
            </div>
            <div className="h-2 bg-white/25 rounded-full overflow-hidden">
              <div className="h-2 bg-white rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {course.tags.map((t) => (
              <span key={t} className="chip bg-white/15 text-white">#{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <div className="card p-5">
        <h3 className="font-bold text-slate-900 mb-4">课程章节（{course.lessons.length} 节）</h3>
        <div className="space-y-2">
          {course.lessons.map((lesson, idx) => {
            const isDone = stats.completedLessons.includes(lesson.id)
            const meta = TYPE_META[lesson.type]
            const prevDone = idx === 0 || stats.completedLessons.includes(course.lessons[idx - 1].id)
            const locked = !prevDone && !isDone
            return (
              <Link
                key={lesson.id}
                to={locked ? '#' : `/lessons/${lesson.id}`}
                className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                  locked ? 'opacity-60 cursor-not-allowed border-slate-100 bg-slate-50'
                  : isDone ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50'
                  : 'border-slate-200 hover:border-brand-300 hover:bg-brand-50/30'
                }`}
                onClick={(e) => locked && e.preventDefault()}
              >
                <div className={`w-10 h-10 rounded-lg ${meta.color} flex items-center justify-center text-lg shrink-0`}>
                  {isDone ? '✓' : locked ? '🔒' : meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">第 {lesson.index} 节</span>
                    <span className={`chip ${meta.color}`}>{meta.label}</span>
                    {isDone && <span className="chip bg-emerald-100 text-emerald-700">已完成</span>}
                  </div>
                  <div className="font-semibold text-slate-900 text-sm mt-0.5 truncate">{lesson.title}</div>
                  <div className="text-xs text-slate-500 truncate">{lesson.summary}</div>
                </div>
                <div className="text-right text-xs text-slate-500 shrink-0">
                  <div>⏱️ {lesson.durationMin} 分钟</div>
                  <div className="text-amber-600 font-semibold">+{lesson.xp} XP</div>
                </div>
              </Link>
            )
          })}
        </div>
        {done === course.lessons.length && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm text-center font-medium">
            🎉 恭喜！你已完成本课程全部内容，继续保持学习节奏！
          </div>
        )}
      </div>
    </div>
  )
}
