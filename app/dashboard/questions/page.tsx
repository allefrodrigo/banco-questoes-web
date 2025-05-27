import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import QuestionList from "@/components/question-list"

export const metadata: Metadata = {
  title: "Questões | Banco de Questões",
  description: "Lista de todas as questões",
}

export default function QuestionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Questões</h1>
        <QuestionList />
      </main>
    </div>
  )
}

