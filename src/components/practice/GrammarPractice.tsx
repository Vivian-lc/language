import { useState } from 'react'
import type { GrammarRule } from '@/types'
import { useProgress } from '@/context/ProgressContext'
import { EmptyState, Badge } from '@/components/ui'

/**
 * Interactive grammar practice:
 * - Show pattern + explanation + examples
 * - Multiple-choice quiz per rule
 * - Score feedback
 */
export function GrammarPractice({ rules }: { rules: GrammarRule[] }) {
  const { recordGrammar, stats } = useProgress()
  const [activeId, setActiveId] = useState(rules[0]?.id)
  const active = rules.find((r) => r.id === activeId) ?? rules[0]

  if (!active) {
    return <EmptyState icon="📭" title="暂无语法内容" desc="该课程暂未配置语法练习" />
  }

  return (
    <div className="space-y-4">
      {/* Rule tabs */}
      <div className="flex flex-wrap gap-2">
        {rules.map((r) => {
          const done = stats.completedGrammar.includes(r.id)
          return (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                r.id === active.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {done && '✓ '}{r.title}
            </button>
          )
        })}
      </div>

      <GrammarRuleCard rule={active} onComplete={(xp) => recordGrammar(active.id, xp)} completed={stats.completedGrammar.includes(active.id)} />
    </div>
  )
}

function GrammarRuleCard({ rule, onComplete, completed }: { rule: GrammarRule; onComplete: (xp: number) => void; completed: boolean }) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = rule.quiz.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0)
  const total = rule.quiz.length
  const passed = submitted && score === total

  const submit = () => {
    setSubmitted(true)
    if (score === total && !completed) onComplete(40)
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="card p-5 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge color="brand">{rule.level}</Badge>
          <h3 className="font-bold text-slate-900 text-lg">{rule.title}</h3>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 font-mono text-sm text-slate-700">📐 {rule.pattern}</div>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">{rule.explanation}</p>
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">例句</div>
        <div className="space-y-2">
          {rule.examples.map((ex, i) => (
            <div key={i} className="rounded-lg border border-slate-100 p-2.5">
              <div className="text-sm font-medium text-slate-900">{ex.sentence}</div>
              <div className="text-xs text-slate-500 mt-0.5">{ex.translation}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">随堂测验 · 全对获得 40 XP</div>
        <div className="space-y-4">
          {rule.quiz.map((q, qi) => (
            <div key={qi} className="rounded-xl border border-slate-200 p-3">
              <div className="text-sm font-medium text-slate-900 mb-2">
                {qi + 1}. {q.question}
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi
                  const correct = q.answer === oi
                  let cls = 'border-slate-200 hover:border-slate-300'
                  if (submitted) {
                    if (correct) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700'
                    else if (selected) cls = 'border-rose-400 bg-rose-50 text-rose-700'
                    else cls = 'border-slate-200 opacity-60'
                  } else if (selected) cls = 'border-brand-400 bg-brand-50 text-brand-700'
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => setAnswers({ ...answers, [qi]: oi })}
                      className={`text-left px-3 py-2 rounded-lg border text-sm transition ${cls}`}
                    >
                      {String.fromCharCode(65 + oi)}. {opt}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <div className="mt-2 text-xs text-slate-500">💡 {q.explanation}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!submitted ? (
          <button onClick={submit} disabled={Object.keys(answers).length !== total} className="btn-primary flex-1">
            提交答案
          </button>
        ) : (
          <>
            <div className={`flex-1 px-3 py-2 rounded-xl text-sm font-semibold ${passed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
              {passed ? `🎉 全对！${completed ? '已记录' : '+40 XP'}` : `得分 ${score}/${total}，再试一次吧`}
            </div>
            <button onClick={reset} className="btn-ghost">重新作答</button>
          </>
        )}
      </div>
    </div>
  )
}
