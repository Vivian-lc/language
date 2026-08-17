import { useParams, Link, useNavigate } from 'react-router-dom'
import { getLessonById } from '@/data/courses'
import { getVocabByCourse } from '@/data/vocabulary'
import { getGrammarByCourse } from '@/data/grammar'
import { getListeningByCourse, getSpeakingByCourse } from '@/data/listening-speaking'
import { VocabularyPractice } from '@/components/practice/VocabularyPractice'
import { GrammarPractice } from '@/components/practice/GrammarPractice'
import { ListeningPractice } from '@/components/practice/ListeningPractice'
import { SpeakingPractice } from '@/components/practice/SpeakingPractice'
import { useProgress } from '@/context/ProgressContext'
import { EmptyState, Badge } from '@/components/ui'
import { LANGUAGES } from '@/data/languages'

const TYPE_LABEL: Record<string, string> = {
  vocabulary: '单词记忆',
  grammar: '语法练习',
  listening: '听力训练',
  speaking: '口语跟读',
}

export default function LessonView() {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()
  const { recordLesson, stats } = useProgress()
  const found = getLessonById(lessonId)

  if (!found) {
    return <EmptyState icon="❓" title="课程不存在" desc="链接可能已失效" action={<Link to="/courses" className="btn-primary">返回课程</Link>} />
  }
  const { course, lesson } = found
  const lang = LANGUAGES[course.language]
  const isDone = stats.completedLessons.includes(lesson.id)

  const handleComplete = () => {
    recordLesson(lesson.id, lesson.xp)
  }

  // After completion: find next lesson in course
  const nextLesson = course.lessons.find((l) => l.index === lesson.index + 1)

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link to={`/courses/${course.id}`} className="text-sm text-slate-500 hover:text-brand-600">← 返回{course.title}</Link>
        {isDone && <Badge color="green">✓ 已完成</Badge>}
      </div>

      {/* Lesson header */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{lang.flag}</span>
          <Badge color="brand">{course.level}</Badge>
          <Badge color="amber">{TYPE_LABEL[lesson.type]}</Badge>
          <span className="text-xs text-slate-400">第 {lesson.index} 节 · ⏱️ {lesson.durationMin} 分钟 · +{lesson.xp} XP</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900">{lesson.title}</h1>
        <p className="text-sm text-slate-600 mt-1">{lesson.summary}</p>
      </div>

      {/* Practice content */}
      <div className="card p-5">
        {lesson.type === 'vocabulary' && <VocabularyPractice items={getVocabByCourse(course.language, course.level)} />}
        {lesson.type === 'grammar' && <GrammarPractice rules={getGrammarByCourse(course.language, course.level)} />}
        {lesson.type === 'listening' && <ListeningPractice items={getListeningByCourse(course.language, course.level)} />}
        {lesson.type === 'speaking' && <SpeakingPractice items={getSpeakingByCourse(course.language, course.level)} />}
      </div>

      {/* Complete & next */}
      <div className="card p-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          {!isDone ? (
            <button onClick={handleComplete} className="btn-primary">✓ 标记本节完成 (+{lesson.xp} XP)</button>
          ) : (
            <div className="text-emerald-600 font-semibold text-sm">✓ 本节已完成 · 获得 {lesson.xp} XP</div>
          )}
        </div>
        {nextLesson ? (
          <button onClick={() => navigate(`/lessons/${nextLesson.id}`)} className="btn-ghost">下一节：{nextLesson.title} →</button>
        ) : (
          <Link to={`/courses/${course.id}`} className="btn-ghost">查看课程目录 →</Link>
        )}
      </div>
    </div>
  )
}
