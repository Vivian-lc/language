import { useState } from 'react'
import { COMMUNITY_POSTS } from '@/data/achievements-community'
import { LANGUAGE_LIST, LANGUAGES } from '@/data/languages'
import { Badge, EmptyState } from '@/components/ui'
import type { CommunityPost, LanguageCode } from '@/types'

export default function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS)
  const [filter, setFilter] = useState<LanguageCode | 'all'>('all')
  const [composeOpen, setComposeOpen] = useState(false)
  const [draft, setDraft] = useState({ title: '', content: '', lang: 'all' as LanguageCode | 'all' })

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.language === filter)

  const toggleLike = (id: string) => {
    setPosts((cur) =>
      cur.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)),
    )
  }

  const publish = () => {
    if (!draft.title.trim() || !draft.content.trim()) return
    const newPost: CommunityPost = {
      id: 'u-' + Date.now(),
      author: '我',
      avatar: '✍️',
      language: draft.lang,
      title: draft.title.trim(),
      content: draft.content.trim(),
      tags: ['原创'],
      likes: 0,
      replies: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setPosts([newPost, ...posts])
    setDraft({ title: '', content: '', lang: 'all' })
    setComposeOpen(false)
    setFilter('all')
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">💬 学习社区</h1>
          <p className="text-sm text-slate-500 mt-1">与全球语言学习者交流心得 · 互助打卡 · 共同进步</p>
        </div>
        <button onClick={() => setComposeOpen((v) => !v)} className="btn-primary">✍️ 发帖分享</button>
      </div>

      {/* Compose */}
      {composeOpen && (
        <div className="card p-4 space-y-3 animate-fade-in">
          <input className="input" placeholder="标题：分享你的学习心得..." value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <textarea className="input min-h-24 resize-y" placeholder="分享学习方法、资源、问题..." value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">分类：</span>
            <button onClick={() => setDraft({ ...draft, lang: 'all' })} className={`pill ${draft.lang === 'all' ? 'active' : ''}`}>🌐 综合</button>
            {LANGUAGE_LIST.map((l) => (
              <button key={l.code} onClick={() => setDraft({ ...draft, lang: l.code })} className={`pill ${draft.lang === l.code ? 'active' : ''}`}>
                {l.flag} {l.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setComposeOpen(false)} className="btn-ghost">取消</button>
            <button onClick={publish} className="btn-primary">发布</button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setFilter('all')} className={`pill ${filter === 'all' ? 'active' : ''}`}>🌐 全部</button>
        {LANGUAGE_LIST.map((l) => (
          <button key={l.code} onClick={() => setFilter(l.code)} className={`pill ${filter === l.code ? 'active' : ''}`}>
            {l.flag} {l.name}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filtered.length === 0 ? (
        <EmptyState icon="📝" title="该板块还没有帖子" desc="来发第一篇吧" />
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <div key={p.id} className="card p-4 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shrink-0">{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">{p.author}</span>
                    <span className="text-xs text-slate-400">{p.createdAt}</span>
                    {p.language !== 'all' && (
                      <Badge color="brand">{LANGUAGES[p.language as LanguageCode]?.flag} {LANGUAGES[p.language as LanguageCode]?.name}</Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 mt-1">{p.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-3">{p.content}</p>
                  <div className="flex items-center gap-3 mt-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs text-brand-600">#{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <button onClick={() => toggleLike(p.id)} className={`flex items-center gap-1 transition ${p.liked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'}`}>
                      {p.liked ? '❤️' : '🤍'} {p.likes}
                    </button>
                    <span className="text-slate-500 flex items-center gap-1">💬 {p.replies}</span>
                    <button className="text-slate-500 hover:text-brand-600">🔗 分享</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`.pill { padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 500; border: 1px solid #e2e8f0; background: white; color: #475569; transition: all .15s; } .pill:hover { border-color: #cbd5e1; } .pill.active { background: #1f56f0; color: white; border-color: #1f56f0; }`}</style>
    </div>
  )
}
