import type { VocabularyItem, LanguageCode, Level } from '@/types'

export const VOCABULARY: VocabularyItem[] = [
  // ===== English A1 =====
  { id: 'en-a1-v1', language: 'en', level: 'A1', word: 'Hello', phonetic: '/həˈloʊ/', partOfSpeech: 'int.', meaning: '你好', example: 'Hello, how are you today?', exampleTranslation: '你好，你今天好吗？' },
  { id: 'en-a1-v2', language: 'en', level: 'A1', word: 'Friend', phonetic: '/frend/', partOfSpeech: 'n.', meaning: '朋友', example: 'She is my best friend.', exampleTranslation: '她是我最好的朋友。' },
  { id: 'en-a1-v3', language: 'en', level: 'A1', word: 'Water', phonetic: '/ˈwɔːtər/', partOfSpeech: 'n.', meaning: '水', example: 'I drink water every day.', exampleTranslation: '我每天喝水。' },
  { id: 'en-a1-v4', language: 'en', level: 'A1', word: 'Book', phonetic: '/bʊk/', partOfSpeech: 'n.', meaning: '书', example: 'This book is interesting.', exampleTranslation: '这本书很有趣。' },
  { id: 'en-a1-v5', language: 'en', level: 'A1', word: 'Thank you', phonetic: '/θæŋk juː/', partOfSpeech: 'phrase', meaning: '谢谢', example: 'Thank you for your help.', exampleTranslation: '谢谢你的帮助。' },

  // ===== English A2 =====
  { id: 'en-a2-v1', language: 'en', level: 'A2', word: 'Airport', phonetic: '/ˈerpɔːrt/', partOfSpeech: 'n.', meaning: '机场', example: 'We arrived at the airport early.', exampleTranslation: '我们很早就到了机场。' },
  { id: 'en-a2-v2', language: 'en', level: 'A2', word: 'Reservation', phonetic: '/ˌrezərˈveɪʃn/', partOfSpeech: 'n.', meaning: '预订', example: 'I have a reservation for tonight.', exampleTranslation: '我预订了今晚的。' },
  { id: 'en-a2-v3', language: 'en', level: 'A2', word: 'Direction', phonetic: '/dəˈrekʃn/', partOfSpeech: 'n.', meaning: '方向', example: 'Can you give me the direction?', exampleTranslation: '你能告诉我方向吗？' },
  { id: 'en-a2-v4', language: 'en', level: 'A2', word: 'Menu', phonetic: '/ˈmenjuː/', partOfSpeech: 'n.', meaning: '菜单', example: 'Could I see the menu, please?', exampleTranslation: '请给我看一下菜单好吗？' },
  { id: 'en-a2-v5', language: 'en', level: 'A2', word: 'Ticket', phonetic: '/ˈtɪkɪt/', partOfSpeech: 'n.', meaning: '票', example: 'Two tickets to London, please.', exampleTranslation: '请给我两张去伦敦的票。' },

  // ===== English B1 =====
  { id: 'en-b1-v1', language: 'en', level: 'B1', word: 'Schedule', phonetic: '/ˈskedʒuːl/', partOfSpeech: 'n.', meaning: '日程安排', example: 'My schedule is full this week.', exampleTranslation: '我这周日程排满了。' },
  { id: 'en-b1-v2', language: 'en', level: 'B1', word: 'Deadline', phonetic: '/ˈdedlaɪn/', partOfSpeech: 'n.', meaning: '截止日期', example: 'The deadline is next Friday.', exampleTranslation: '截止日期是下周五。' },
  { id: 'en-b1-v3', language: 'en', level: 'B1', word: 'Agenda', phonetic: '/əˈdʒendə/', partOfSpeech: 'n.', meaning: '议程', example: 'Let me send you the meeting agenda.', exampleTranslation: '我把会议议程发给你。' },
  { id: 'en-b1-v4', language: 'en', level: 'B1', word: 'Feedback', phonetic: '/ˈfiːdbæk/', partOfSpeech: 'n.', meaning: '反馈', example: 'I appreciate your feedback on the report.', exampleTranslation: '感谢你对报告的反馈。' },
  { id: 'en-b1-v5', language: 'en', level: 'B1', word: 'Negotiate', phonetic: '/nɪˈɡoʊʃieɪt/', partOfSpeech: 'v.', meaning: '谈判、协商', example: 'We need to negotiate the price.', exampleTranslation: '我们需要协商价格。' },

  // ===== Japanese A1 =====
  { id: 'ja-a1-v1', language: 'ja', level: 'A1', word: 'こんにちは', romaji: 'konnichiwa', meaning: '你好（白天）', example: 'こんにちは、田中さん。', exampleTranslation: '你好，田中。' },
  { id: 'ja-a1-v2', language: 'ja', level: 'A1', word: 'ありがとう', romaji: 'arigatou', meaning: '谢谢', example: '本当にありがとう。', exampleTranslation: '真的很感谢。' },
  { id: 'ja-a1-v3', language: 'ja', level: 'A1', word: '学校', romaji: 'gakkou', meaning: '学校', example: '私は学校に行きます。', exampleTranslation: '我去学校。' },
  { id: 'ja-a1-v4', language: 'ja', level: 'A1', word: '水', romaji: 'mizu', meaning: '水', example: '水を飲みます。', exampleTranslation: '我喝水。' },
  { id: 'ja-a1-v5', language: 'ja', level: 'A1', word: '友達', romaji: 'tomodachi', meaning: '朋友', example: '友達に会います。', exampleTranslation: '我去见朋友。' },

  // ===== Japanese A2 =====
  { id: 'ja-a2-v1', language: 'ja', level: 'A2', word: '切符', romaji: 'kippu', meaning: '车票', example: '切符を買います。', exampleTranslation: '我买票。' },
  { id: 'ja-a2-v2', language: 'ja', level: 'A2', word: '駅', romaji: 'eki', meaning: '车站', example: '駅で待ちましょう。', exampleTranslation: '在车站等吧。' },
  { id: 'ja-a2-v3', language: 'ja', level: 'A2', word: 'お弁当', romaji: 'obentou', meaning: '便当', example: 'お弁当を食べます。', exampleTranslation: '我吃便当。' },
  { id: 'ja-a2-v4', language: 'ja', level: 'A2', word: '値段', romaji: 'nedan', meaning: '价格', example: '値段が高いです。', exampleTranslation: '价格很贵。' },
  { id: 'ja-a2-v5', language: 'ja', level: 'A2', word: 'お釣り', romaji: 'otsuri', meaning: '找零', example: 'お釣りをください。', exampleTranslation: '请给我找零。' },

  // ===== Korean A1 =====
  { id: 'ko-a1-v1', language: 'ko', level: 'A1', word: '안녕하세요', romaji: 'annyeonghaseyo', meaning: '你好', example: '안녕하세요, 만나서 반갑습니다.', exampleTranslation: '你好，很高兴见到你。' },
  { id: 'ko-a1-v2', language: 'ko', level: 'A1', word: '감사합니다', romaji: 'gamsahamnida', meaning: '谢谢', example: '도와주셔서 감사합니다.', exampleTranslation: '谢谢你的帮助。' },
  { id: 'ko-a1-v3', language: 'ko', level: 'A1', word: '학교', romaji: 'hakgyo', meaning: '学校', example: '저는 학교에 가요.', exampleTranslation: '我去学校。' },
  { id: 'ko-a1-v4', language: 'ko', level: 'A1', word: '친구', romaji: 'chingu', meaning: '朋友', example: '친구를 만나요.', exampleTranslation: '我去见朋友。' },
  { id: 'ko-a1-v5', language: 'ko', level: 'A1', word: '물', romaji: 'mul', meaning: '水', example: '물을 마셔요.', exampleTranslation: '我喝水。' },

  // ===== Korean A2 =====
  { id: 'ko-a2-v1', language: 'ko', level: 'A2', word: '주문', romaji: 'jumun', meaning: '点单、订单', example: '주문할게요.', exampleTranslation: '我要点单。' },
  { id: 'ko-a2-v2', language: 'ko', level: 'A2', word: '메뉴', romaji: 'menyu', meaning: '菜单', example: '메뉴 좀 보여주세요.', exampleTranslation: '请给我看一下菜单。' },
  { id: 'ko-a2-v3', language: 'ko', level: 'A2', word: '계산', romaji: 'gyesan', meaning: '结账', example: '계산해 주세요.', exampleTranslation: '请结账。' },
  { id: 'ko-a2-v4', language: 'ko', level: 'A2', word: '맛있다', romaji: 'masitda', meaning: '好吃', example: '정말 맛있어요.', exampleTranslation: '真的很好吃。' },
  { id: 'ko-a2-v5', language: 'ko', level: 'A2', word: '포장', romaji: 'pojang', meaning: '打包', example: '포장해 주세요.', exampleTranslation: '请打包。' },
]

export function getVocabByCourse(lang: LanguageCode, level: Level): VocabularyItem[] {
  return VOCABULARY.filter((v) => v.language === lang && v.level === level)
}

export function getVocabById(id: string): VocabularyItem | undefined {
  return VOCABULARY.find((v) => v.id === id)
}
