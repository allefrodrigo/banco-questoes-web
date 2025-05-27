import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import QuestionForm from "@/components/question-form"

export const metadata: Metadata = {
  title: "Editar Questão | Banco de Questões",
  description: "Editar uma questão existente",
}

export default function EditQuestionPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Editar Questão</h1>
        <QuestionForm editMode={true} questionId={params.id} />
      </main>
    </div>
  )
}

