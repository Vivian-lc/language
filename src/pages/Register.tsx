import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { LANGUAGE_LIST, GOAL_LABELS } from '@/data/languages'
import type { LanguageCode, LearningGoal } from '@/types'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [goal, setGoal] = useState<LearningGoal>('travel')
  const [interests, setInterests] = useState<LanguageCode[]>(['en'])
  const [error, setError] = useState('')

  const toggleInterest = (code: LanguageCode) => {
    setInterests((cur) => (cur.includes(code) ? cur.filter((c) => c !== code) : [...cur, code]))
  }

  const submit = () => {
    setError('')
    if (interests.length === 0) {
      setError('请至少选择一门想学的语言')
      return
    }
    const res = register({ username, email, password, goal, interests })
    if (!res.ok) {
      setError(res.error || '注册失败')
      return
    }
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg card p-6 sm:p-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🌍</span>
          <span className="font-extrabold text-lg">语界 LinguaWorld</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">创建账号</h2>
        <p className="text-sm text-slate-500 mt-1">让我们为你定制专属学习路径</p>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mt-5">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`h-1.5 flex-1 rounded-full ${step >= s ? 'bg-brand-500' : 'bg-slate-200'}`} />
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-500 mt-1">{step === 1 ? '步骤 1/2 · 账号信息' : '步骤 2/2 · 学习偏好'}</div>

        {step === 1 ? (
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">昵称</label>
              <input className="input" placeholder="如何称呼你？" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">邮箱</label>
              <input className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
              <input className="input" type="password" placeholder="至少 6 位" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div className="text-sm text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{error}</div>}
            <button
              className="btn-primary w-full"
              onClick={() => {
                if (!username.trim() || !email.trim() || password.length < 6) {
                  setError('请完整填写，密码至少 6 位')
                  return
                }
                setError('')
                setStep(2)
              }}
            >
              下一步
            </button>
            <p className="text-sm text-slate-500 text-center">
              已有账号？<Link to="/login" className="text-brand-600 font-semibold hover:underline">直接登录</Link>
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">学习目标</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(GOAL_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setGoal(key as LearningGoal)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition ${
                      goal === key ? 'bg-brand-50 border-brand-400 text-brand-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">想学的语言（可多选）</label>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGE_LIST.map((lang) => {
                  const active = interests.includes(lang.code)
                  return (
                    <button
                      key={lang.code}
                      onClick={() => toggleInterest(lang.code)}
                      className={`px-3 py-3 rounded-xl text-sm border transition flex flex-col items-center gap-1 ${
                        active ? 'bg-brand-50 border-brand-400 text-brand-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-semibold">{lang.name}</span>
                      <span className="text-[10px] text-slate-400">{lang.nativeName}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {error && <div className="text-sm text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{error}</div>}
            <div className="flex gap-2">
              <button className="btn-ghost flex-1" onClick={() => setStep(1)}>上一步</button>
              <button className="btn-primary flex-1" onClick={submit}>完成注册</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
