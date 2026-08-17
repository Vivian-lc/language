// Core domain types for the multi-language learning platform

export type LanguageCode = 'en' | 'ja' | 'ko'

export interface Language {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
  color: string
  gradient: string
  description: string
}

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface Course {
  id: string
  language: LanguageCode
  level: Level
  title: string
  description: string
  totalLessons: number
  estimatedHours: number
  tags: string[]
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  courseId: string
  index: number
  title: string
  summary: string
  type: LessonType
  durationMin: number
  xp: number
}

export type LessonType = 'vocabulary' | 'grammar' | 'listening' | 'speaking'

export interface VocabularyItem {
  id: string
  language: LanguageCode
  level: Level
  word: string
  phonetic?: string
  romaji?: string
  meaning: string
  example: string
  exampleTranslation: string
  partOfSpeech?: string
}

export interface GrammarRule {
  id: string
  language: LanguageCode
  level: Level
  title: string
  pattern: string
  explanation: string
  examples: { sentence: string; translation: string }[]
  quiz: GrammarQuiz[]
}

export interface GrammarQuiz {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface ListeningItem {
  id: string
  language: LanguageCode
  level: Level
  title: string
  topic: string
  text: string
  translation: string
  durationSec: number
  difficulty: 1 | 2 | 3
}

export interface SpeakingItem {
  id: string
  language: LanguageCode
  level: Level
  phrase: string
  phonetic?: string
  romaji?: string
  translation: string
  context: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (stats: UserStats) => boolean
  xp: number
}

export interface CommunityPost {
  id: string
  author: string
  avatar: string
  language: LanguageCode | 'all'
  title: string
  content: string
  tags: string[]
  likes: number
  replies: number
  createdAt: string
  liked?: boolean
}

export interface User {
  id: string
  username: string
  email: string
  password: string // demo only - stored in localStorage
  avatar: string
  joinedAt: string
  goal: LearningGoal
  interests: LanguageCode[]
  dailyGoalXp: number
}

export type LearningGoal = 'travel' | 'work' | 'exam' | 'hobby' | 'culture'

export interface UserStats {
  totalXp: number
  streakDays: number
  lastActiveDate: string
  completedLessons: string[]
  completedVocab: string[]
  completedGrammar: string[]
  completedListening: string[]
  completedSpeaking: string[]
  masteredWords: string[]
  achievements: string[]
  dailyXp: { date: string; xp: number }[]
  languageProgress: Record<LanguageCode, number> // percentage per language
  newlyUnlockedAchievements?: string[] // transient: set during recompute
}

export interface ProgressState {
  stats: UserStats
}
