"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"

type Question = {
  id: string
  title: string
  category: string
  difficulty: "Fácil" | "Médio" | "Difícil"
  createdAt: string
  status: "active" | "inactive"
}

export default function RecentQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    // Simulação de dados de questões recentes
    // Em um caso real, isso viria de uma API
    const mockQuestions: Question[] = [
      {
        id: "1",
        title: "Qual é a capital do Brasil?",
        category: "Geografia",
        difficulty: "Fácil",
        createdAt: "2023-10-15",
        status: "active",
      },
      {
        id: "2",
        title: "Quem escreveu 'Dom Casmurro'?",
        category: "Literatura",
        difficulty: "Médio",
        createdAt: "2023-10-14",
        status: "active",
      },
      {
        id: "3",
        title: "Qual é a fórmula química da água?",
        category: "Química",
        difficulty: "Fácil",
        createdAt: "2023-10-13",
        status: "active",
      },
      {
        id: "4",
        title: "Qual é o maior planeta do sistema solar?",
        category: "Astronomia",
        difficulty: "Médio",
        createdAt: "2023-10-12",
        status: "inactive",
      },
      {
        id: "5",
        title: "Resolva a equação: 2x + 5 = 15",
        category: "Matemática",
        difficulty: "Fácil",
        createdAt: "2023-10-11",
        status: "active",
      },
    ]

    setQuestions(mockQuestions)
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800"
      case "Médio":
        return "bg-yellow-100 text-yellow-800"
      case "Difícil":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Questões Recentes</CardTitle>
        <Button asChild>
          <Link href="/dashboard/questions">Ver Todas</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Dificuldade</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="font-medium">{question.title}</TableCell>
                <TableCell>{question.category}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}
                  >
                    {question.difficulty}
                  </span>
                </TableCell>
                <TableCell>{question.createdAt}</TableCell>
                <TableCell>
                  <Badge variant={question.status === "active" ? "default" : "secondary"}>
                    {question.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/questions/edit/${question.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

