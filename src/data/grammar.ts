import type { GrammarRule, LanguageCode, Level } from '@/types'

export const GRAMMAR: GrammarRule[] = [
  // ===== English A1 =====
  {
    id: 'en-a1-g1',
    language: 'en',
    level: 'A1',
    title: 'I am / You are 句型',
    pattern: '主语 + am/is/are + ...',
    explanation: 'be 动词用于说明身份、状态与特征。I 搭配 am，第三人称单数搭配 is，复数与 you 搭配 are。',
    examples: [
      { sentence: 'I am a student.', translation: '我是一名学生。' },
      { sentence: 'She is my teacher.', translation: '她是我的老师。' },
      { sentence: 'They are friends.', translation: '他们是朋友。' },
    ],
    quiz: [
      {
        question: '选择正确的 be 动词：She ___ my sister.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: '第三人称单数用 is。',
      },
      {
        question: '选择正确的 be 动词：We ___ happy.',
        options: ['is', 'am', 'are', 'was'],
        answer: 2,
        explanation: '复数主语用 are。',
      },
    ],
  },

  // ===== English A2 =====
  {
    id: 'en-a2-g1',
    language: 'en',
    level: 'A2',
    title: '一般现在时',
    pattern: '主语 + 动词原形 / 动词 + s (三单)',
    explanation: '表示习惯、客观事实或经常发生的动作。第三人称单数主语动词需加 -s/-es。',
    examples: [
      { sentence: 'I drink coffee every morning.', translation: '我每天早上喝咖啡。' },
      { sentence: 'He works in a bank.', translation: '他在银行工作。' },
    ],
    quiz: [
      {
        question: 'She ___ to school by bus.',
        options: ['go', 'goes', 'going', 'went'],
        answer: 1,
        explanation: '第三人称单数动词加 -es。',
      },
      {
        question: 'They ___ tennis on weekends.',
        options: ['plays', 'play', 'playing', 'played'],
        answer: 1,
        explanation: '复数主语用动词原形。',
      },
    ],
  },

  // ===== English B1 =====
  {
    id: 'en-b1-g1',
    language: 'en',
    level: 'B1',
    title: '定语从句',
    pattern: '名词 + who/which/that + 从句',
    explanation: 'who 修饰人，which 修饰物，that 兼用。定语从句用于对名词进行补充说明。',
    examples: [
      { sentence: 'The man who lives next door is a doctor.', translation: '住在隔壁的那个男人是医生。' },
      { sentence: 'The book which I bought is great.', translation: '我买的那本书很棒。' },
    ],
    quiz: [
      {
        question: 'The woman ___ called you is my boss.',
        options: ['which', 'who', 'what', 'where'],
        answer: 1,
        explanation: '修饰人用 who。',
      },
      {
        question: 'This is the car ___ I want to buy.',
        options: ['who', 'whose', 'which', 'where'],
        answer: 2,
        explanation: '修饰物用 which。',
      },
    ],
  },

  // ===== Japanese A1 =====
  {
    id: 'ja-a1-g1',
    language: 'ja',
    level: 'A1',
    title: 'です / ます 礼貌体',
    pattern: '名词 + です / 动词ます形 + ます',
    explanation: 'です/ます 是礼貌体的基本句尾，用于正式场合或与不熟悉的人交谈。',
    examples: [
      { sentence: '私は学生です。', translation: '我是学生。' },
      { sentence: '水を飲みます。', translation: '我喝水。' },
    ],
    quiz: [
      {
        question: '田中さんは先生（　）.',
        options: ['です', 'だ', 'が', 'を'],
        answer: 0,
        explanation: '礼貌体用 です。',
      },
      {
        question: '私は水を（　）.',
        options: ['飲む', '飲みます', '飲んで', '飲んだ'],
        answer: 1,
        explanation: '礼貌体动词用 ます 形。',
      },
    ],
  },

  // ===== Japanese A2 =====
  {
    id: 'ja-a2-g1',
    language: 'ja',
    level: 'A2',
    title: 'て形变形',
    pattern: '动词て形 + ください / て / から',
    explanation: 'て形用于表示请求、动作的连续或原因。一类动词、二类动词、三类动词变形规则不同。',
    examples: [
      { sentence: 'ここに座ってください。', translation: '请坐在这里。' },
      { sentence: '朝ごはんを食べて、出かけます。', translation: '吃完早饭出门。' },
    ],
    quiz: [
      {
        question: '「飲む」的て形是？',
        options: ['飲みて', '飲んで', '飲って', '飲んて'],
        answer: 1,
        explanation: 'む结尾动词て形变为 んで。',
      },
      {
        question: '「書く」的て形是？',
        options: ['書いて', '書きて', '書って', '書んで'],
        answer: 0,
        explanation: 'く结尾动词て形变为 いて。',
      },
    ],
  },

  // ===== Korean A1 =====
  {
    id: 'ko-a1-g1',
    language: 'ko',
    level: 'A1',
    title: '입니다 / 습니다 格式体',
    pattern: '名词 + 입니다 / 动词词干 + 습니다(ㅂ니다)',
    explanation: '格式体是最正式的句尾。名词用 입니다；有收音动词用 습니다，无收音动词用 ㅂ니다。',
    examples: [
      { sentence: '저는 학생입니다.', translation: '我是学生。' },
      { sentence: '물을 마십니다.', translation: '我喝水。' },
    ],
    quiz: [
      {
        question: '저는 학생（　）.',
        options: ['입니다', '습니다', '가', '요'],
        answer: 0,
        explanation: '名词后用 입니다。',
      },
      {
        question: '책을 읽（　）.',
        options: ['입니다', '습니다', '요', '는다'],
        answer: 1,
        explanation: '읽 有收音，用 습니다。',
      },
    ],
  },

  // ===== Korean A2 =====
  {
    id: 'ko-a2-g1',
    language: 'ko',
    level: 'A2',
    title: '过去时 았/었',
    pattern: '动词词干 + 았/었 + 습니다/어요',
    explanation: '表示过去发生的动作。词干最后元音为 ㅏ/ㅗ 时用 았，其他用 었。',
    examples: [
      { sentence: '어제 영화를 봤어요.', translation: '昨天看了电影。' },
      { sentence: '밥을 먹었습니다.', translation: '吃了饭。' },
    ],
    quiz: [
      {
        question: '가다 的过去时是？',
        options: ['갔어요', '가었어요', '갔습니다', 'A 和 C 都对'],
        answer: 3,
        explanation: '가다 词干 가，最后元音 ㅏ，用 았 → 갔。',
      },
      {
        question: '먹다 的过去时是？',
        options: ['먹앗어요', '먹었어요', '먹어요', '먹고 있어요'],
        answer: 1,
        explanation: '먹 词干元音 ㅓ，用 었 → 먹었。',
      },
    ],
  },
]

export function getGrammarByCourse(lang: LanguageCode, level: Level): GrammarRule[] {
  return GRAMMAR.filter((g) => g.language === lang && g.level === level)
}
