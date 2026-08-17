import type { User, UserStats, LanguageCode, LearningGoal } from '@/types'
import { COURSES } from '@/data/courses'
import { ACHIEVEMENTS } from '@/data/achievements-community'
import { todayStr, daysBetween } from './storage'

export function createEmptyStats(): UserStats {
  return {
    totalXp: 0,
    streakDays: 0,
    lastActiveDate: '',
    completedLessons: [],
    completedVocab: [],
    completedGrammar: [],
    completedListening: [],
    completedSpeaking: [],
    masteredWords: [],
    achievements: [],
    dailyXp: [],
    languageProgress: { en: 0, ja: 0, ko: 0 },
  }
}

export function createUser(
  username: string,
  email: string,
  password: string,
  goal: LearningGoal,
  interests: LanguageCode[],
): User {
  return {
    id: 'u-' + Math.random().toString(36).slice(2, 9),
    username,
    email,
    password,
    avatar: pickAvatar(username),
    joinedAt: todayStr(),
    goal,
    interests,
    dailyGoalXp: 50,
  }
}

const AVATARS = ['🐼', '🦊', '🐯', '🐰', '🦉', '🐱', '🐶', '🦁', '🐨', '🐵']
export function pickAvatar(seed: string): string {
  let sum = 0
  for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i)
  return AVATARS[sum % AVATARS.length]
}

export function defaultUserStats(stats: UserStats): UserStats {
  return { ...createEmptyStats(), ...stats }
}

/**
 * Recompute derived fields: streak, daily xp entries, achievements, language progress.
 */
export function recomputeStats(stats: UserStats): UserStats {
  const next = { ...stats }

  // Streak
  const today = todayStr()
  if (next.lastActiveDate !== today) {
    if (next.lastActiveDate && daysBetween(next.lastActiveDate, today) === 1) {
      next.streakDays = next.streakDays + 1
    } else if (next.lastActiveDate && daysBetween(next.lastActiveDate, today) > 1) {
      next.streakDays = 1
    } else if (!next.lastActiveDate) {
      next.streakDays = 1
    }
    next.lastActiveDate = today
  }

  // Today's XP entry
  const todayEntry = next.dailyXp.find((d) => d.date === today)
  if (!todayEntry) {
    next.dailyXp = [...next.dailyXp, { date: today, xp: 0 }].slice(-30)
  }

  // Language progress: percentage of completed lessons per language
  const progress = { en: 0, ja: 0, ko: 0 } as Record<LanguageCode, number>
  for (const lang of ['en', 'ja', 'ko'] as LanguageCode[]) {
    const total = COURSES.filter((c) => c.language === lang).reduce((s, c) => s + c.lessons.length, 0)
    const done = COURSES.filter((c) => c.language === lang).reduce(
      (s, c) => s + c.lessons.filter((l) => next.completedLessons.includes(l.id)).length,
      0,
    )
    progress[lang] = total === 0 ? 0 : Math.round((done / total) * 100)
  }
  next.languageProgress = progress

  // Achievements
  const newlyUnlocked: string[] = []
  for (const a of ACHIEVEMENTS) {
    if (!next.achievements.includes(a.id) && a.condition(next)) {
      newlyUnlocked.push(a.id)
    }
  }
  if (newlyUnlocked.length) {
    next.achievements = [...next.achievements, ...newlyUnlocked]
    const bonusXp = newlyUnlocked
      .map((id) => ACHIEVEMENTS.find((a) => a.id === id)?.xp || 0)
      .reduce((s, v) => s + v, 0)
    next.totalXp += bonusXp
    next.newlyUnlockedAchievements = newlyUnlocked
  } else {
    next.newlyUnlockedAchievements = []
  }

  return next
}

// Helper to record XP into today's entry
export function addXp(stats: UserStats, amount: number): UserStats {
  const today = todayStr()
  const dailyXp = [...stats.dailyXp]
  const idx = dailyXp.findIndex((d) => d.date === today)
  if (idx >= 0) {
    dailyXp[idx] = { ...dailyXp[idx], xp: dailyXp[idx].xp + amount }
  } else {
    dailyXp.push({ date: today, xp: amount })
  }
  return { ...stats, totalXp: stats.totalXp + amount, dailyXp: dailyXp.slice(-30) }
}
