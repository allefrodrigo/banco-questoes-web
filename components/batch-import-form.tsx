"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileUp, Check, Loader2 } from "lucide-react";
import { uploadDocx } from "@/services/uploadService";
import QuestionItem, { Question } from "./question-item";

interface Lista {
  nome: string;
  proficiencia: string;
  questoes: Question[];
}

const markdownToHtml = (text: string) => {
  const regex = /!\[([\s\S]*?)\]\((data:image\/[^)]+)\)/g;
  return text.replace(
    regex,
    (_m, _alt, uri) =>
      `<img src="${uri}" alt="${_alt}" style="max-width:100%; margin:8px 0;" />`
  );
};

export default function BatchImportForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<Lista[] | null>(null);
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>(
    {}
  );
  const [error, setError] = useState("");

  const keyOf = (li: number, qi: number) => `${li}-${qi}`;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError("");
      setPreviewData(null);
      setSelectedMap({});
    }
  };

  const handlePreview = async () => {
    if (!file) return setError("Selecione um arquivo.");
    if (!category) return setError("Selecione uma categoria.");
    if (!difficulty) return setError("Selecione uma dificuldade.");

    setError("");
    setIsLoading(true);
    try {
      const res = await uploadDocx(file);
      const listas: Lista[] = res.listas.map((l: any) => ({
        nome: l.nome,
        proficiencia: l.proficiencia,
        questoes: l.questoes.map((q: any) => ({
          number: q.number,
          prova: q.prova,
          probabilidade: q.probabilidade,
          enunciado: q.enunciado,
          enunciadoHtml: markdownToHtml(q.enunciado),
          alternatives: Object.entries(q.alternatives).map(
            ([letter, text]: [string, string]) => ({
              letter,
              text,
              isCorrect: q.answer === letter,
            })
          ),
          answer: q.answer,
        })),
      }));
      setPreviewData(listas);
    } catch (err: any) {
      setError(err.message || "Erro ao processar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (
    li: number,
    qi: number,
    checked: boolean
  ) => {
    const key = keyOf(li, qi);
    setSelectedMap((p) => ({ ...p, [key]: checked }));
  };

  const handleDelete = (li: number, qi: number) => {
    setPreviewData((p) =>
      p?.map((L, i) =>
        i === li
          ? {
              ...L,
              questoes: L.questoes.filter((_, j) => j !== qi),
            }
          : L
      ) || null
    );
    const key = keyOf(li, qi);
    setSelectedMap((p) => {
      const np = { ...p };
      delete np[key];
      return np;
    });
  };

  const handleUpdate = (
    li: number,
    qi: number,
    upd: Question
  ) => {
    setPreviewData((p) =>
      p?.map((L, i) =>
        i === li
          ? {
              ...L,
              questoes: L.questoes.map((Q, j) =>
                j === qi
                  ? {
                      ...upd,
                      enunciadoHtml: markdownToHtml(upd.enunciado),
                    }
                  : Q
              ),
            }
          : L
      ) || null
    );
  };

  const handleImport = () => {
    if (!previewData) return;
    setIsLoading(true);
    setTimeout(() => {
      const total = previewData.reduce(
        (s, L) => s + L.questoes.length,
        0
      );
      setIsLoading(false);
      alert(`${total} questões importadas!`);
      router.push("/dashboard/questions");
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Importar Lote de Questões</CardTitle>
        <CardDescription>
          Importe várias questões de uma vez via DOCX.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* upload */}
        <div className="space-y-2">
          <Label>Arquivo</Label>
          <div className="flex justify-center">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
              <FileUp className="w-8 h-8 mb-2 text-gray-500" />
              <span className="text-sm text-gray-500">
                clique ou arraste
              </span>
              <Input
                type="file"
                className="hidden"
                accept=".docx"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {file && (
            <p className="text-sm">
              Selecionado: <b>{file.name}</b>
            </p>
          )}
        </div>

        {/* categoria/dificuldade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Categoria</Label>
            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger>
                <SelectValue>
                  Selecione categoria
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Matemática">
                  Matemática
                </SelectItem>
                <SelectItem value="Português">
                  Português
                </SelectItem>
                <SelectItem value="História">
                  História
                </SelectItem>
                <SelectItem value="Geografia">
                  Geografia
                </SelectItem>
                <SelectItem value="Ciências">
                  Ciências
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Dificuldade</Label>
            <Select
              value={difficulty}
              onValueChange={setDifficulty}
            >
              <SelectTrigger>
                <SelectValue>
                  Selecione dificuldade
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fácil">Fácil</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
                <SelectItem value="Difícil">Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* preview */}
        {previewData && (
          <div className="border rounded p-4 max-h-[60vh] overflow-auto space-y-4">
            {previewData.map((L, li) => (
              <div key={li} className="space-y-2">
                <h3 className="font-medium">
                  {L.nome} – {L.proficiencia}
                </h3>
                <div className="space-y-2">
                  {L.questoes.map((q, qi) => (
                    <QuestionItem
                      key={keyOf(li, qi)}
                      listaIndex={li}
                      questaoIndex={qi}
                      question={q}
                      selected={
                        !!selectedMap[keyOf(li, qi)]
                      }
                      onSelect={(c) =>
                        handleSelect(li, qi, c)
                      }
                      onDelete={() =>
                        handleDelete(li, qi)
                      }
                      onUpdate={(u) =>
                        handleUpdate(li, qi, u)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/questions")}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        {!previewData ? (
          <Button
            onClick={handlePreview}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando
              </>
            ) : (
              "Pré-visualizar"
            )}
          </Button>
        ) : (
          <Button
            onClick={handleImport}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importando
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Importar{" "}
                {previewData.reduce(
                  (sum, L) => sum + L.questoes.length,
                  0
                )}{" "}
                Questões
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
