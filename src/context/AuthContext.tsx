import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User, LearningGoal, LanguageCode } from '@/types'
import { load, save, remove } from '@/utils/storage'
import { createUser } from '@/utils/stats'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  register: (params: {
    username: string
    email: string
    password: string
    goal: LearningGoal
    interests: LanguageCode[]
  }) => { ok: boolean; error?: string }
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
  updateUser: (patch: Partial<User>) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const USERS_KEY = 'users'
const SESSION_KEY = 'session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const sessionUserId = load<string | null>(SESSION_KEY, null)
    if (!sessionUserId) return null
    const users = load<User[]>(USERS_KEY, [])
    return users.find((u) => u.id === sessionUserId) ?? null
  })

  useEffect(() => {
    if (user) {
      save(SESSION_KEY, user.id)
      // also update users list
      const users = load<User[]>(USERS_KEY, [])
      const idx = users.findIndex((u) => u.id === user.id)
      if (idx >= 0) users[idx] = user
      else users.push(user)
      save(USERS_KEY, users)
    }
  }, [user])

  const register: AuthContextValue['register'] = ({ username, email, password, goal, interests }) => {
    const emailClean = email.trim().toLowerCase()
    if (!username.trim() || !emailClean || !password) {
      return { ok: false, error: '请完整填写所有字段' }
    }
    if (password.length < 6) {
      return { ok: false, error: '密码至少 6 位' }
    }
    const users = load<User[]>(USERS_KEY, [])
    if (users.some((u) => u.email === emailClean)) {
      return { ok: false, error: '该邮箱已被注册' }
    }
    const newUser = createUser(username.trim(), emailClean, password, goal, interests)
    users.push(newUser)
    save(USERS_KEY, users)
    setUser(newUser)
    return { ok: true }
  }

  const login: AuthContextValue['login'] = (email, password) => {
    const emailClean = email.trim().toLowerCase()
    const users = load<User[]>(USERS_KEY, [])
    const found = users.find((u) => u.email === emailClean)
    if (!found) return { ok: false, error: '该邮箱尚未注册' }
    if (found.password !== password) return { ok: false, error: '密码不正确' }
    setUser(found)
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    remove(SESSION_KEY)
  }

  const updateUser: AuthContextValue['updateUser'] = (patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
