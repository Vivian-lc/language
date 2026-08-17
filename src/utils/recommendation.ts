import type { User, UserStats, Course, LanguageCode } from '@/types'
import { COURSES, getCoursesByLanguage } from '@/data/courses'
import { LANGUAGES } from '@/data/languages'

export interface Recommendation {
  type: 'course' | 'review' | 'new-skill' | 'streak'
  title: string
  reason: string
  action?: { label: string; to: string }
  icon: string
  priority: number
}

/**
 * Personalized learning path recommendation.
 * Uses: user goal, interests, current progress per language, streak.
 */
export function recommendPath(user: User, stats: UserStats): Recommendation[] {
  const recs: Recommendation[] = []

  // 1. For each interest language, recommend the next appropriate course
  for (const lang of user.interests) {
    const courses = getCoursesByLanguage(lang).sort((a, b) => levelOrder(a.level) - levelOrder(b.level))
    const nextCourse = courses.find((c) => {
      const done = c.lessons.filter((l) => stats.completedLessons.includes(l.id)).length
      return done < c.lessons.length
    })
    if (nextCourse) {
      const langName = LANGUAGES[lang].name
      const done = nextCourse.lessons.filter((l) => stats.completedLessons.includes(l.id)).length
      recs.push({
        type: 'course',
        title: `继续学习：${nextCourse.title}`,
        reason:
          done === 0
            ? `根据你的兴趣，推荐从 ${langName} 的「${nextCourse.level}」级别开始`
            : `你已完成 ${done}/${nextCourse.lessons.length} 节，继续推进 ${langName} 学习`,
        action: { label: '前往课程', to: `/courses/${nextCourse.id}` },
        icon: LANGUAGES[lang].flag,
        priority: done === 0 ? 80 : 90,
      })
    }
  }

  // 2. If user has no interest selected, recommend based on goal
  if (user.interests.length === 0) {
    const lang: LanguageCode = user.goal === 'exam' ? 'ja' : 'en'
    const first = getCoursesByLanguage(lang)[0]
    if (first) {
      recs.push({
        type: 'new-skill',
        title: `从零开始：${first.title}`,
        reason: '尚未选择学习语言，根据你的目标推荐从这一门开始',
        action: { label: '开始学习', to: `/courses/${first.id}` },
        icon: LANGUAGES[lang].flag,
        priority: 70,
      })
    }
  }

  // 3. Goal-based targeted recommendations
  if (user.goal === 'travel') {
    recs.push({
      type: 'new-skill',
      title: '旅行场景专项强化',
      reason: '出行前强化点餐、问路、酒店等高频场景，让旅程更顺畅',
      action: { label: '查看场景课', to: '/courses' },
      icon: '✈️',
      priority: 60,
    })
  } else if (user.goal === 'exam') {
    recs.push({
      type: 'new-skill',
      title: '考级冲刺计划',
      reason: '结合考级大纲，建议每周完成 2 节课程 + 1 次模考',
      action: { label: '制定计划', to: '/progress' },
      icon: '🎓',
      priority: 60,
    })
  } else if (user.goal === 'work') {
    recs.push({
      type: 'new-skill',
      title: '商务表达强化',
      reason: '聚焦职场邮件、会议、汇报场景，提升工作沟通力',
      action: { label: '查看课程', to: '/courses' },
      icon: '💼',
      priority: 60,
    })
  }

  // 4. Review recommendation if there are mastered words
  if (stats.masteredWords.length >= 5) {
    recs.push({
      type: 'review',
      title: '复习已学单词',
      reason: `你已掌握 ${stats.masteredWords.length} 个单词，建议今日复习巩固记忆`,
      action: { label: '去复习', to: '/vocabulary' },
      icon: '🔁',
      priority: 75,
    })
  }

  // 5. Streak nudge
  if (stats.streakDays > 0 && stats.streakDays < 7) {
    recs.push({
      type: 'streak',
      title: `坚持连胜 · 已 ${stats.streakDays} 天`,
      reason: '再坚持几天就能解锁「一周不辍」成就，保持节奏！',
      action: { label: '今日学习', to: '/dashboard' },
      icon: '🔥',
      priority: 50,
    })
  }

  // 6. Suggest a brand new language if user has good progress in one
  const strongLang = (Object.keys(stats.languageProgress) as LanguageCode[]).find(
    (l) => stats.languageProgress[l as LanguageCode] >= 50 && !user.interests.includes(l as LanguageCode),
  ) as LanguageCode | undefined
  if (strongLang) {
    recs.push({
      type: 'new-skill',
      title: `挑战第二外语：${LANGUAGES[strongLang].name}`,
      reason: `你在其他语言上表现出色，是时候开启 ${LANGUAGES[strongLang].name} 之旅了`,
      action: { label: '查看课程', to: '/courses' },
      icon: '🌍',
      priority: 40,
    })
  }

  return recs.sort((a, b) => b.priority - a.priority).slice(0, 5)
}

function levelOrder(level: string): number {
  return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(level)
}

// A suggested weekly plan based on user's daily goal xp
export function weeklyPlan(stats: UserStats, dailyGoalXp: number) {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  return days.map((d, i) => {
    const entries = stats.dailyXp.slice(-7)
    const xp = entries[i]?.xp ?? 0
    return {
      day: d,
      xp,
      goal: dailyGoalXp,
      reached: xp >= dailyGoalXp,
    }
  })
}
