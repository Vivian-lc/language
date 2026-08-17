import { useProgress } from '@/context/ProgressContext'
import { ACHIEVEMENTS } from '@/data/achievements-community'
import { StatCard, ProgressBar } from '@/components/ui'

export default function Achievements() {
  const { stats } = useProgress()
  const unlocked = stats.achievements
  const unlockedCount = unlocked.length
  const totalBonusXp = unlocked.reduce((s, id) => s + (ACHIEVEMENTS.find((a) => a.id === id)?.xp || 0), 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">🏆 成就激励</h1>
        <p className="text-sm text-slate-500 mt-1">解锁成就 · 赢取经验 · 让坚持看得见回报</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="🏅" label="已解锁" value={`${unlockedCount}/${ACHIEVEMENTS.length}`} />
        <StatCard icon="⭐" label="成就经验" value={`+${totalBonusXp}`} sub="XP" />
        <StatCard icon="🔥" label="连续天数" value={`${stats.streakDays}`} sub="天" />
        <StatCard icon="📚" label="掌握词汇" value={stats.masteredWords.length} sub="词" />
      </div>

      {/* Progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-900">总成就进度</h3>
          <span className="text-sm text-slate-500">{Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%</span>
        </div>
        <ProgressBar value={unlockedCount} max={ACHIEVEMENTS.length} height="h-3" />
      </div>

      {/* Achievement grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked.includes(a.id)
          const progress = getAchievementProgress(a.id, stats)
          return (
            <div
              key={a.id}
              className={`card p-4 text-center transition ${
                isUnlocked ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200' : 'opacity-80'
              }`}
            >
              <div className={`text-4xl mb-2 ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                {isUnlocked ? a.icon : '🔒'}
              </div>
              <div className="font-bold text-slate-900 text-sm">{a.title}</div>
              <div className="text-xs text-slate-500 mt-1">{a.description}</div>
              <div className={`chip mt-2 ${isUnlocked ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                {isUnlocked ? `✓ +${a.xp} XP` : `目标 +${a.xp} XP`}
              </div>
              {!isUnlocked && progress < 1 && (
                <div className="mt-3">
                  <ProgressBar value={progress * 100} color="bg-amber-400" height="h-1.5" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function getAchievementProgress(id: string, stats: ReturnType<typeof useProgress>['stats']): number {
  switch (id) {
    case 'first-step':
      return Math.min(1, stats.completedLessons.length / 1)
    case 'word-collector':
      return Math.min(1, stats.masteredWords.length / 10)
    case 'grammar-master':
      return Math.min(1, stats.completedGrammar.length / 3)
    case 'good-listener':
      return Math.min(1, stats.completedListening.length / 3)
    case 'speaker':
      return Math.min(1, stats.completedSpeaking.length / 3)
    case 'streak-3':
      return Math.min(1, stats.streakDays / 3)
    case 'streak-7':
      return Math.min(1, stats.streakDays / 7)
    case 'xp-500':
      return Math.min(1, stats.totalXp / 500)
    case 'xp-1500':
      return Math.min(1, stats.totalXp / 1500)
    case 'polyglot':
      return Math.min(1, Object.values(stats.languageProgress).filter((v) => v > 0).length / 2)
    default:
      return 0
  }
}
