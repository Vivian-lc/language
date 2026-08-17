import type { ListeningItem, SpeakingItem, LanguageCode, Level } from '@/types'

export const LISTENING: ListeningItem[] = [
  {
    id: 'en-a1-l1',
    language: 'en',
    level: 'A1',
    title: '早安问候对话',
    topic: '日常问候',
    durationSec: 30,
    difficulty: 1,
    text: 'Good morning! How are you today? — I am fine, thank you. And you? — I am great. Let us start the class.',
    translation: '早上好！你今天好吗？——我很好，谢谢。你呢？——我很好。我们开始上课吧。',
  },
  {
    id: 'en-a2-l1',
    language: 'en',
    level: 'A2',
    title: '餐厅点餐对话',
    topic: '餐饮',
    durationSec: 45,
    difficulty: 2,
    text: 'Welcome! Here is the menu. What would you like to order? — I would like a steak and a glass of water, please. — Sure, anything else? — No, that is all, thank you.',
    translation: '欢迎光临！这是菜单。您要点什么？——请给我一份牛排和一杯水。——好的，还需要别的吗？——不用了，就这些，谢谢。',
  },
  {
    id: 'en-b1-l1',
    language: 'en',
    level: 'B1',
    title: '工作汇报片段',
    topic: '职场',
    durationSec: 50,
    difficulty: 3,
    text: 'Good morning everyone. Today I would like to share our quarterly results. Revenue increased by fifteen percent compared to last quarter. However, we still face challenges in the overseas market.',
    translation: '大家早上好。今天我想分享一下我们的季度业绩。收入较上季度增长了百分之十五。不过，我们在海外市场仍面临挑战。',
  },
  {
    id: 'ja-a1-l1',
    language: 'ja',
    level: 'A1',
    title: '初识问候',
    topic: '日常问候',
    durationSec: 30,
    difficulty: 1,
    text: 'はじめまして。田中です。どうぞよろしくお願いします。— はじめまして、李です。こちらこそよろしくお願いします。',
    translation: '初次见面，我是田中。请多关照。——初次见面，我是小李。也请你多多关照。',
  },
  {
    id: 'ja-a2-l1',
    language: 'ja',
    level: 'A2',
    title: '便利店结账',
    topic: '购物',
    durationSec: 35,
    difficulty: 2,
    text: 'いらっしゃいませ。— このおにぎりをください。— はい、120円です。— はい、千円から。— お預かりします。お釣りです。',
    translation: '欢迎光临。——请给我这个饭团。——好的，120日元。——这是1000日元。——收您1000日元。这是找零。',
  },
  {
    id: 'ko-a1-l1',
    language: 'ko',
    level: 'A1',
    title: '初次见面问候',
    topic: '日常问候',
    durationSec: 30,
    difficulty: 1,
    text: '안녕하세요, 만나서 반갑습니다. 저는 김민수입니다. — 안녕하세요, 저는 왕웨이입니다. 잘 부탁드립니다.',
    translation: '你好，很高兴见到你。我是金敏秀。——你好，我是王伟。请多关照。',
  },
  {
    id: 'ko-a2-l1',
    language: 'ko',
    level: 'A2',
    title: '咖啡店点单',
    topic: '餐饮',
    durationSec: 35,
    difficulty: 2,
    text: '어서 오세요. — 아이스 아메리카노 한 잔 주세요. — 사이즈는 어떻게 해드릴까요? — 큰 걸로 주세요. — 네, 4500원입니다.',
    translation: '欢迎光临。——请给我一杯冰美式。——要什么尺寸的？——大杯的。——好的，4500韩元。',
  },
]

export function getListeningByCourse(lang: LanguageCode, level: Level): ListeningItem[] {
  return LISTENING.filter((l) => l.language === lang && l.level === level)
}

export const SPEAKING: SpeakingItem[] = [
  { id: 'en-a1-s1', language: 'en', level: 'A1', phrase: 'Hello, my name is Alex.', phonetic: '/həˈloʊ maɪ neɪm ɪz ˈælɪks/', translation: '你好，我叫 Alex。', context: '自我介绍' },
  { id: 'en-a1-s2', language: 'en', level: 'A1', phrase: 'Nice to meet you.', phonetic: '/naɪs tuː miːt juː/', translation: '很高兴认识你。', context: '初次见面' },
  { id: 'en-a2-s1', language: 'en', level: 'A2', phrase: 'Excuse me, where is the station?', phonetic: '/ɪkˈskjuːz miː wer ɪz ðə ˈsteɪʃn/', translation: '打扰一下，车站在哪里？', context: '问路' },
  { id: 'en-a2-s2', language: 'en', level: 'A2', phrase: 'I would like a cup of coffee, please.', phonetic: '/aɪ wʊd laɪk ə kʌp əv ˈkɔːfi pliːz/', translation: '请给我一杯咖啡。', context: '点餐' },
  { id: 'en-b1-s1', language: 'en', level: 'B1', phrase: 'In my opinion, we should focus on quality.', phonetic: '/ɪn maɪ əˈpɪnjən/', translation: '在我看来，我们应该注重质量。', context: '观点表达' },
  { id: 'ja-a1-s1', language: 'ja', level: 'A1', phrase: 'はじめまして、よろしくお願いします。', romaji: 'hajimemashite, yoroshiku onegaishimasu', translation: '初次见面，请多关照。', context: '自我介绍' },
  { id: 'ja-a1-s2', language: 'ja', level: 'A1', phrase: 'ありがとうございます。', romaji: 'arigatou gozaimasu', translation: '非常感谢。', context: '道谢' },
  { id: 'ja-a2-s1', language: 'ja', level: 'A2', phrase: 'これをください。', romaji: 'kore o kudasai', translation: '请给我这个。', context: '购物' },
  { id: 'ko-a1-s1', language: 'ko', level: 'A1', phrase: '안녕하세요, 반갑습니다.', romaji: 'annyeonghaseyo, banGapseumnida', translation: '你好，很高兴见到你。', context: '自我介绍' },
  { id: 'ko-a1-s2', language: 'ko', level: 'A1', phrase: '감사합니다.', romaji: 'gamsahamnida', translation: '谢谢。', context: '道谢' },
  { id: 'ko-a2-s1', language: 'ko', level: 'A2', phrase: '아이스 아메리카노 한 잔 주세요.', romaji: 'aiseu amerikano han jan juseyo', translation: '请给我一杯冰美式。', context: '点单' },
  { id: 'ko-a2-s2', language: 'ko', level: 'A2', phrase: '얼마예요?', romaji: 'eolmayeyo', translation: '多少钱？', context: '购物' },
]

export function getSpeakingByCourse(lang: LanguageCode, level: Level): SpeakingItem[] {
  return SPEAKING.filter((s) => s.language === lang && s.level === level)
}
