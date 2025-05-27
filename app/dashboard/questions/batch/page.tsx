import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import BatchImportForm from "@/components/batch-import-form"

export const metadata: Metadata = {
  title: "Importar Lote | Banco de Questões",
  description: "Importar lote de questões",
}

export default function BatchImportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 w-full p-4 md:p-6">
      <BatchImportForm />
      </main>
    </div>
  )
}

