import { LogOut, Settings, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl p-1 bg-accent">
            <Image
              src="/images/design-mode/Image.png"
              alt="가르처주꾸마 로고"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xl font-bold text-primary">{"가르처주꾸마"}</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="default"
            asChild
            className="text-foreground hover:text-primary hover:bg-primary/10"
          >
            <Link href="/gallery">
              <ImageIcon className="mr-2 h-4 w-4" />내 작품 갤러리
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="default"
            asChild
            className="text-foreground hover:text-primary hover:bg-primary/10"
          >
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              프로필 및 설정
            </Link>
          </Button>
          <Button variant="ghost" size="default" className="text-foreground hover:text-primary hover:bg-primary/10">
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </Button>
        </nav>
      </div>
    </header>
  )
}
