"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, LogOut, Database, Plus, FileUp } from "lucide-react"

export default function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-xl">
          Banco de Questões
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard/questions">
                <Database className="mr-2 h-4 w-4" />
                Questões
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/questions/new">
                <Plus className="mr-2 h-4 w-4" />
                Nova Questão
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/questions/batch">
                <FileUp className="mr-2 h-4 w-4" />
                Importar Lote
              </Link>
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/questions">
                  <Database className="mr-2 h-4 w-4" />
                  Questões
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/questions/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Questão
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/questions/batch">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importar Lote
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

