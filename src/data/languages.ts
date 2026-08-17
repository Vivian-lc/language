import type { Language, LanguageCode } from '@/types'

export const LANGUAGES: Record<LanguageCode, Language> = {
  en: {
    code: 'en',
    name: '英语',
    nativeName: 'English',
    flag: '🇬🇧',
    color: '#2563eb',
    gradient: 'from-blue-500 to-indigo-600',
    description: '全球通用语 · 商务、学术、科技首选语言',
  },
  ja: {
    code: 'ja',
    name: '日语',
    nativeName: '日本語',
    flag: '🇯🇵',
    color: '#e11d48',
    gradient: 'from-rose-500 to-red-600',
    description: '动漫文化之窗 · JLPT 等级考试体系',
  },
  ko: {
    code: 'ko',
    name: '韩语',
    nativeName: '한국어',
    flag: '🇰🇷',
    color: '#2563eb',
    gradient: 'from-sky-500 to-blue-600',
    description: 'K-Pop 与韩剧之桥 · TOPIK 等级考试体系',
  },
}

export const LANGUAGE_LIST = Object.values(LANGUAGES)

export const LEVEL_LABELS: Record<string, { label: string; desc: string }> = {
  A1: { label: '入门', desc: '掌握基础发音与日常问候' },
  A2: { label: '初级', desc: '能进行简单的日常交流' },
  B1: { label: '中级', desc: '可应对旅行与工作场景' },
  B2: { label: '中高级', desc: '流畅表达观点、阅读长文' },
  C1: { label: '高级', desc: '接近母语者的专业表达' },
  C2: { label: '精通', desc: '母语级精通与学术应用' },
}

export const GOAL_LABELS: Record<string, string> = {
  travel: '✈️ 旅游出行',
  work: '💼 工作需要',
  exam: '🎓 考级认证',
  hobby: '🎨 兴趣爱好',
  culture: '🌏 文化探索',
}
