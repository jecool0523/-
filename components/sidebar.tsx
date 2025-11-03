"use client"

import { LayoutDashboard, Users, Lightbulb, BookOpen, Blocks, GraduationCap, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "대시보드",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "릴레이 프롬프트",
    href: "/relay-prompt",
    icon: Users,
  },
  {
    title: "프롬프튜터링",
    href: "/prompt-tutoring",
    icon: GraduationCap,
  },
  {
    title: "프롬프트 블록 코딩",
    href: "/prompt-block-coding",
    icon: Blocks,
  },
  {
    title: "리얼 프롬프트 엔지니어링",
    href: "/real-prompt-engineering",
    icon: Sparkles,
  },
  {
    title: "자유 창작소",
    href: "/free-creation",
    icon: Lightbulb,
  },
  {
    title: "학습 가이드",
    href: "/learning-guide",
    icon: BookOpen,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 border-r border-sidebar-border bg-sidebar md:block">
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-primary/10 hover:text-primary",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
