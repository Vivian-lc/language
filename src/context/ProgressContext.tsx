import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { UserStats } from '@/types'
import { load, save } from '@/utils/storage'
import { createEmptyStats, recomputeStats, addXp } from '@/utils/stats'
import { ACHIEVEMENTS } from '@/data/achievements-community'
import { useAuth } from './AuthContext'

interface ProgressContextValue {
  stats: UserStats
  recordLesson: (lessonId: string, xp: number) => void
  recordVocab: (vocabId: string, xp: number, mastered?: boolean) => void
  recordGrammar: (grammarId: string, xp: number) => void
  recordListening: (id: string, xp: number) => void
  recordSpeaking: (id: string, xp: number) => void
  reset: () => void
  newlyUnlocked: string[]
  clearNewlyUnlocked: () => void
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id ?? 'guest'
  const [stats, setStats] = useState<UserStats>(() => createEmptyStats())
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([])

  // Load user-specific stats on login
  useEffect(() => {
    if (!user) {
      setStats(createEmptyStats())
      return
    }
    const loaded = load<UserStats>(`stats:${userId}`, createEmptyStats())
    setStats(recomputeStats(loaded))
  }, [userId, user])

  // Persist stats on change
  useEffect(() => {
    if (user) {
      save(`stats:${userId}`, stats)
    }
  }, [stats, userId, user])

  const applyAndRecompute = useCallback((updater: (s: UserStats) => UserStats) => {
    setStats((prev) => {
      const next = updater(prev)
      const recomputed = recomputeStats(next)
      if (recomputed.newlyUnlockedAchievements?.length) {
        setNewlyUnlocked((cur) => [...cur, ...recomputed.newlyUnlockedAchievements!])
      }
      return { ...recomputed, newlyUnlockedAchievements: [] }
    })
  }, [])

  const recordLesson = useCallback(
    (lessonId: string, xp: number) => {
      applyAndRecompute((s) => {
        if (s.completedLessons.includes(lessonId)) return s
        const withXp = addXp(s, xp)
        return { ...withXp, completedLessons: [...withXp.completedLessons, lessonId] }
      })
    },
    [applyAndRecompute],
  )

  const recordVocab = useCallback(
    (vocabId: string, xp: number, mastered = false) => {
      applyAndRecompute((s) => {
        let next = s
        if (!next.completedVocab.includes(vocabId)) {
          next = { ...next, completedVocab: [...next.completedVocab, vocabId] }
        }
        if (mastered && !next.masteredWords.includes(vocabId)) {
          next = { ...next, masteredWords: [...next.masteredWords, vocabId] }
        }
        // only add XP the first time it's completed
        if (!s.completedVocab.includes(vocabId)) {
          next = addXp(next, xp)
        }
        return next
      })
    },
    [applyAndRecompute],
  )

  const recordGrammar = useCallback(
    (grammarId: string, xp: number) => {
      applyAndRecompute((s) => {
        if (s.completedGrammar.includes(grammarId)) return s
        const withXp = addXp(s, xp)
        return { ...withXp, completedGrammar: [...withXp.completedGrammar, grammarId] }
      })
    },
    [applyAndRecompute],
  )

  const recordListening = useCallback(
    (id: string, xp: number) => {
      applyAndRecompute((s) => {
        if (s.completedListening.includes(id)) return s
        const withXp = addXp(s, xp)
        return { ...withXp, completedListening: [...withXp.completedListening, id] }
      })
    },
    [applyAndRecompute],
  )

  const recordSpeaking = useCallback(
    (id: string, xp: number) => {
      applyAndRecompute((s) => {
        if (s.completedSpeaking.includes(id)) return s
        const withXp = addXp(s, xp)
        return { ...withXp, completedSpeaking: [...withXp.completedSpeaking, id] }
      })
    },
    [applyAndRecompute],
  )

  const reset = useCallback(() => {
    setStats(createEmptyStats())
    setNewlyUnlocked([])
  }, [])

  const clearNewlyUnlocked = useCallback(() => setNewlyUnlocked([]), [])

  return (
    <ProgressContext.Provider
      value={{
        stats,
        recordLesson,
        recordVocab,
        recordGrammar,
        recordListening,
        recordSpeaking,
        reset,
        newlyUnlocked,
        clearNewlyUnlocked,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}

// re-export for convenience
export { ACHIEVEMENTS }
