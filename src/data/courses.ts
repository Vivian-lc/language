import type { Course, LanguageCode, Lesson, Level } from '@/types'

// Helper to build lessons for a course
function buildLessons(
  courseId: string,
  language: LanguageCode,
  level: Level,
  items: Array<Pick<Lesson, 'title' | 'summary' | 'type' | 'durationMin' | 'xp'>>,
): Lesson[] {
  return items.map((it, i) => ({
    id: `${courseId}-l${i + 1}`,
    courseId,
    index: i + 1,
    title: it.title,
    summary: it.summary,
    type: it.type,
    durationMin: it.durationMin,
    xp: it.xp,
  }))
}

export const COURSES: Course[] = [
  // ===== English =====
  {
    id: 'en-a1',
    language: 'en',
    level: 'A1',
    title: '英语零基础入门',
    description: '从字母、发音到日常问候，建立英语学习的第一块基石。',
    totalLessons: 4,
    estimatedHours: 6,
    tags: ['发音', '日常问候', '基础词汇'],
    lessons: buildLessons('en-a1', 'en', 'A1', [
      { title: '字母与发音', summary: '26 个字母的发音规律', type: 'vocabulary', durationMin: 15, xp: 30 },
      { title: '自我介绍', summary: '学会用 I am 句型介绍自己', type: 'grammar', durationMin: 20, xp: 40 },
      { title: '日常问候听力', summary: '听懂 Good morning / How are you', type: 'listening', durationMin: 12, xp: 25 },
      { title: '打招呼口语', summary: '跟读标准问候表达', type: 'speaking', durationMin: 10, xp: 25 },
    ]),
  },
  {
    id: 'en-a2',
    language: 'en',
    level: 'A2',
    title: '英语初级进阶',
    description: '掌握一般现在时与过去时，能描述日常生活与简单经历。',
    totalLessons: 4,
    estimatedHours: 8,
    tags: ['时态', '生活场景', '旅行'],
    lessons: buildLessons('en-a2', 'en', 'A2', [
      { title: '一般现在时', summary: '描述习惯与日常', type: 'grammar', durationMin: 18, xp: 35 },
      { title: '旅行场景词汇', summary: '机场、酒店、问路', type: 'vocabulary', durationMin: 15, xp: 30 },
      { title: '点餐听力训练', summary: '餐厅点餐对话', type: 'listening', durationMin: 12, xp: 25 },
      { title: '问路与指路口语', summary: '实用问路表达', type: 'speaking', durationMin: 12, xp: 30 },
    ]),
  },
  {
    id: 'en-b1',
    language: 'en',
    level: 'B1',
    title: '英语中级表达',
    description: '能流畅讨论兴趣、计划与观点，掌握多种时态与从句。',
    totalLessons: 4,
    estimatedHours: 10,
    tags: ['从句', '观点表达', '工作场景'],
    lessons: buildLessons('en-b1', 'en', 'B1', [
      { title: '定语从句', summary: 'who/which/that 引导的从句', type: 'grammar', durationMin: 20, xp: 40 },
      { title: '职场高频词汇', summary: '会议、邮件、汇报', type: 'vocabulary', durationMin: 18, xp: 35 },
      { title: '新闻播报听力', summary: '慢速英语新闻', type: 'listening', durationMin: 15, xp: 35 },
      { title: '观点陈述口语', summary: 'I think / In my opinion', type: 'speaking', durationMin: 15, xp: 35 },
    ]),
  },

  // ===== Japanese =====
  {
    id: 'ja-a1',
    language: 'ja',
    level: 'A1',
    title: '日语入门 · 五十音',
    description: '系统学习平假名、片假名与基本问候，迈出日语第一步。',
    totalLessons: 4,
    estimatedHours: 7,
    tags: ['五十音', '问候', '基础汉字'],
    lessons: buildLessons('ja-a1', 'ja', 'A1', [
      { title: '平假名あ〜ん', summary: '46 个平假名认读', type: 'vocabulary', durationMin: 20, xp: 40 },
      { title: 'です/ます 句型', summary: '礼貌体的基本句型', type: 'grammar', durationMin: 18, xp: 35 },
      { title: '日常问候听力', summary: 'おはよう・こんにちは', type: 'listening', durationMin: 12, xp: 25 },
      { title: '自我介绍口语', summary: 'はじめまして', type: 'speaking', durationMin: 12, xp: 30 },
    ]),
  },
  {
    id: 'ja-a2',
    language: 'ja',
    level: 'A2',
    title: '日语初级 · N5 进阶',
    description: '掌握动词变形与基本助词，能应对日常会话场景。',
    totalLessons: 4,
    estimatedHours: 9,
    tags: ['动词变形', '助词', '生活会话'],
    lessons: buildLessons('ja-a2', 'ja', 'A2', [
      { title: 'て形变形', summary: '动词て形与连接表达', type: 'grammar', durationMin: 22, xp: 45 },
      { title: '便利店场景词汇', summary: '购物、结账、问询', type: 'vocabulary', durationMin: 15, xp: 30 },
      { title: '电车广播听力', summary: '车站常见广播', type: 'listening', durationMin: 12, xp: 30 },
      { title: '购物口语', summary: 'これをください', type: 'speaking', durationMin: 12, xp: 30 },
    ]),
  },

  // ===== Korean =====
  {
    id: 'ko-a1',
    language: 'ko',
    level: 'A1',
    title: '韩语入门 · 韩文字母',
    description: '学习韩文元音、辅音与收音，掌握基本问候与自我介绍。',
    totalLessons: 4,
    estimatedHours: 7,
    tags: ['韩文字母', '收音', '问候'],
    lessons: buildLessons('ko-a1', 'ko', 'A1', [
      { title: '元音与辅音', summary: '21 个元音 + 19 个辅音', type: 'vocabulary', durationMin: 20, xp: 40 },
      { title: '입니다/습니다 句型', summary: '格式体基本句型', type: 'grammar', durationMin: 18, xp: 35 },
      { title: '问候语听力', summary: '안녕하세요 系列', type: 'listening', durationMin: 12, xp: 25 },
      { title: '自我介绍口语', summary: '만나서 반갑습니다', type: 'speaking', durationMin: 12, xp: 30 },
    ]),
  },
  {
    id: 'ko-a2',
    language: 'ko',
    level: 'A2',
    title: '韩语初级 · TOPIK 2',
    description: '掌握时态与连接词尾，能进行日常生活对话。',
    totalLessons: 4,
    estimatedHours: 9,
    tags: ['时态', '连接词尾', '日常会话'],
    lessons: buildLessons('ko-a2', 'ko', 'A2', [
      { title: '过去时 았/었', summary: '-았/었- 时态变化', type: 'grammar', durationMin: 22, xp: 45 },
      { title: '咖啡店场景词汇', summary: '点单、口味、加料', type: 'vocabulary', durationMin: 15, xp: 30 },
      { title: '韩剧对白听力', summary: '日常对话片段', type: 'listening', durationMin: 12, xp: 30 },
      { title: '咖啡店点单口语', summary: '아이스 아메리카노 주세요', type: 'speaking', durationMin: 12, xp: 30 },
    ]),
  },
]

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id)
}

export function getCoursesByLanguage(lang: LanguageCode): Course[] {
  return COURSES.filter((c) => c.language === lang)
}

export function getLessonById(lessonId: string): { course: Course; lesson: Lesson } | undefined {
  for (const course of COURSES) {
    const lesson = course.lessons.find((l) => l.id === lessonId)
    if (lesson) return { course, lesson }
  }
  return undefined
}
