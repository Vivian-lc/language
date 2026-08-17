import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = login(email, password)
    setLoading(false)
    if (!res.ok) {
      setError(res.error || '登录失败')
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left brand panel */}
      <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 text-white">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌍</span>
          <span className="text-xl font-extrabold">语界 LinguaWorld</span>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">沉浸式多语种<br />学习之旅</h1>
          <p className="mt-4 text-brand-100 max-w-md">
            英语 · 日语 · 韩语，分级课程体系、互动练习、智能推荐与社区陪伴，让每一分钟学习都有迹可循。
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            {[
              { n: '3+', l: '主流语言' },
              { n: '7', l: '课程分级' },
              { n: '∞', l: '学习可能' },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 rounded-xl p-3 backdrop-blur">
                <div className="text-2xl font-extrabold">{s.n}</div>
                <div className="text-xs text-brand-100">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-brand-200">© 2026 LinguaWorld · 学习让世界更近</div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <span className="text-2xl">🌍</span>
            <span className="font-extrabold text-lg">语界 LinguaWorld</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">欢迎回来 👋</h2>
          <p className="text-sm text-slate-500 mt-1">登录继续你的语言学习之旅</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">邮箱</label>
              <input className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
              <input className="input" type="password" placeholder="至少 6 位" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <div className="text-sm text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{error}</div>}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-6 text-center">
            还没有账号？<Link to="/register" className="text-brand-600 font-semibold hover:underline">立即注册</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
