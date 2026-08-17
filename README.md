# 语界 LinguaWorld · 多语种沉浸式学习平台

一个支持英语 / 日语 / 韩语的多语种在线教育平台，基于 **React 18 + TypeScript + Vite + Tailwind CSS** 构建。

## ✨ 核心能力

| 能力 | 描述 |
| --- | --- |
| 📚 **分级课程体系** | 按 CEFR 国际标准（A1–C2）分级，共 7 门课程，覆盖三种主流语言 |
| 🔤 **互动式学习模块** | 单词记忆（3D 翻卡） · 语法练习（讲解+测验） · 听力训练（语音合成+慢速+填空） · 口语跟读（录音+评分） |
| 📊 **学习进度追踪** | 经验值 · 连胜天数 · 14 天活跃度图表 · 模块完成数 · 各语言进度条，全部 localStorage 持久化 |
| 👤 **用户注册登录** | 两步式注册（账号 + 学习偏好），会话保持与路由守卫 |
| ✨ **个性化学习路径推荐** | 基于学习目标、兴趣语言、当前进度智能生成推荐与本周学习计划 |
| 💬🏆 **社区 + 成就激励** | 发帖 / 点赞 / 分类板块 · 10 项成就解锁，XP 奖励 + 弹窗动画 |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器 (端口 5173)
npm run dev

# 生产构建
npm run build

# 预览构建产物 (端口 5173/5174)
npm run preview
```

## 🗂️ 项目结构

```
.
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig*.json
└── src/
    ├── App.tsx                   # 路由与全局 Provider
    ├── main.tsx                  # 入口
    ├── index.css                 # Tailwind 样式
    ├── types/                    # 核心领域类型
    ├── data/                     # 课程/单词/语法/听力/口语/成就 数据层
    ├── utils/                    # 存储 / 统计 / 推荐 工具
    ├── context/                  # AuthContext · ProgressContext
    ├── components/               # 布局 · UI · 四个练习模块
    └── pages/                    # 各页面（Dashboard/Courses/Lessons/Modules/…）
```

## 🎯 支持的语言与分级

- 🇬🇧 英语 (English)：A1 零基础入门 · A2 初级进阶 · B1 中级表达
- 🇯🇵 日语 (日本語)：A1 五十音入门 · A2 N5 进阶
- 🇰🇷 韩语 (한국어)：A1 韩文字母入门 · A2 TOPIK 2 进阶

## 📝 License

MIT
