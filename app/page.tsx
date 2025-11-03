import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProgressCard } from "@/components/progress-card"
import { CurriculumSection } from "@/components/curriculum-section"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8 lg:p-12">
          <div className="mx-auto max-w-7xl space-y-8">
            <ProgressCard />
            <CurriculumSection />
          </div>
        </main>
      </div>
    </div>
  )
}
