import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Banco de Questões</h1>
          <p className="text-gray-500 mt-2">Faça login para acessar o sistema</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

