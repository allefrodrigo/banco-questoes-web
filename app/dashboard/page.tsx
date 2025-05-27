import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import QuestionStats from "@/components/question-stats"
import RecentQuestions from "@/components/recent-questions"

export const metadata: Metadata = {
  title: "Dashboard | Banco de Questões",
  description: "Gerencie seu banco de questões",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <QuestionStats />
        <RecentQuestions />
      </main>
    </div>
  )
}

