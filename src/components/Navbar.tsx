import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useProgress } from '@/context/ProgressContext'
import { ACHIEVEMENTS } from '@/data/achievements-community'

const NAV_ITEMS = [
  { to: '/dashboard', label: '学习中心', icon: '🏠' },
  { to: '/courses', label: '课程', icon: '📚' },
  { to: '/vocabulary', label: '单词', icon: '🔤' },
  { to: '/grammar', label: '语法', icon: '🧠' },
  { to: '/listening', label: '听力', icon: '👂' },
  { to: '/speaking', label: '口语', icon: '🗣️' },
  { to: '/recommendations', label: '智能推荐', icon: '✨' },
  { to: '/community', label: '社区', icon: '💬' },
  { to: '/achievements', label: '成就', icon: '🏆' },
  { to: '/progress', label: '进度', icon: '📊' },
]

export function Navbar() {
  const { user, logout } = useAuth()
  const { stats } = useProgress()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  // Close profile dropdown on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="menu"
          >
            <span className="text-xl">☰</span>
          </button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            <span className="font-extrabold text-slate-900 tracking-tight">语界<span className="text-brand-600">LinguaWorld</span></span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.slice(0, 7).map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                location.pathname.startsWith(it.to)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
            <span>🔥</span>
            <span>{stats.streakDays} 天</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
            <span>⭐</span>
            <span>{stats.totalXp} XP</span>
          </div>
          {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                <span className="text-xl">{user.avatar}</span>
                <span className="hidden sm:block text-sm font-medium text-slate-700">{user.username}</span>
                <span className="text-[10px] text-slate-400">▾</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-40 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="text-sm font-semibold">{user.username}</div>
                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                  </div>
                  <Link to="/progress" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">📊 学习进度</Link>
                  <Link to="/achievements" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">🏆 我的成就</Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">退出登录</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="grid grid-cols-2 gap-1 p-3">
            {NAV_ITEMS.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                className={`px-3 py-2 rounded-lg text-sm ${
                  location.pathname.startsWith(it.to) ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {it.icon} {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

// Toast that shows when achievements are newly unlocked
export function AchievementToast() {
  const { newlyUnlocked, clearNewlyUnlocked } = useProgress()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (newlyUnlocked.length === 0) return
    setIdx(0)
    const t = setInterval(() => {
      setIdx((i) => {
        if (i + 1 >= newlyUnlocked.length) {
          clearInterval(t)
          setTimeout(clearNewlyUnlocked, 2500)
          return i
        }
        return i + 1
      })
    }, 2800)
    return () => clearInterval(t)
  }, [newlyUnlocked, clearNewlyUnlocked])

  if (newlyUnlocked.length === 0) return null
  const ach = ACHIEVEMENTS.find((a) => a.id === newlyUnlocked[idx])
  if (!ach) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-pop">
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl shadow-2xl p-4 pr-6 flex items-center gap-3 max-w-xs">
        <div className="text-4xl">{ach.icon}</div>
        <div>
          <div className="text-xs font-medium opacity-90">🎉 解锁新成就</div>
          <div className="font-bold text-base">{ach.title}</div>
          <div className="text-xs opacity-90 mt-0.5">{ach.description} · +{ach.xp} XP</div>
        </div>
      </div>
    </div>
  )
}
