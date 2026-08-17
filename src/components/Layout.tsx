import type { ReactNode } from 'react'
import { Navbar, AchievementToast } from './Navbar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        语界 LinguaWorld · 多语种沉浸式学习平台 · Demo
      </footer>
      <AchievementToast />
    </div>
  )
}
