"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

type QuestionFormProps = {
  editMode?: boolean
  questionId?: string
}

export default function QuestionForm({ editMode = false, questionId }: QuestionFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    difficulty: "",
    alternatives: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    explanation: "",
    status: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, status: checked })
  }

  const handleAlternativeChange = (index: number, value: string) => {
    const newAlternatives = [...formData.alternatives]
    newAlternatives[index] = { ...newAlternatives[index], text: value }
    setFormData({ ...formData, alternatives: newAlternatives })
  }

  const handleCorrectAlternativeChange = (index: number) => {
    const newAlternatives = formData.alternatives.map((alt, i) => ({
      ...alt,
      isCorrect: i === index,
    }))
    setFormData({ ...formData, alternatives: newAlternatives })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em um caso real, aqui seria feita uma chamada à API para salvar a questão
    alert(editMode ? "Questão atualizada com sucesso!" : "Questão criada com sucesso!")
    router.push("/dashboard/questions")
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{editMode ? "Editar Questão" : "Nova Questão"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Digite o título da questão"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Enunciado</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Digite o enunciado da questão"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Matemática">Matemática</SelectItem>
                  <SelectItem value="Português">Português</SelectItem>
                  <SelectItem value="História">História</SelectItem>
                  <SelectItem value="Geografia">Geografia</SelectItem>
                  <SelectItem value="Ciências">Ciências</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Dificuldade</Label>
              <Select value={formData.difficulty} onValueChange={(value) => handleSelectChange("difficulty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fácil">Fácil</SelectItem>
                  <SelectItem value="Médio">Médio</SelectItem>
                  <SelectItem value="Difícil">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Alternativas</Label>
            {formData.alternatives.map((alternative, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    value={alternative.text}
                    onChange={(e) => handleAlternativeChange(index, e.target.value)}
                    placeholder={`Alternativa ${index + 1}`}
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`correct-${index}`} className="text-sm">
                    Correta
                  </Label>
                  <input
                    type="radio"
                    id={`correct-${index}`}
                    name="correctAlternative"
                    checked={alternative.isCorrect}
                    onChange={() => handleCorrectAlternativeChange(index)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation">Explicação</Label>
            <Textarea
              id="explanation"
              name="explanation"
              value={formData.explanation}
              onChange={handleInputChange}
              placeholder="Digite a explicação da resposta correta"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="status" checked={formData.status} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="status">Questão ativa</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/questions")}>
            Cancelar
          </Button>
          <Button type="submit">{editMode ? "Atualizar Questão" : "Criar Questão"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

