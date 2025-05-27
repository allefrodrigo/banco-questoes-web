import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import QuestionForm from "@/components/question-form"

export const metadata: Metadata = {
  title: "Nova Questão | Banco de Questões",
  description: "Criar uma nova questão",
}

export default function NewQuestionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Nova Questão</h1>
        <QuestionForm />
      </main>
    </div>
  )
}

