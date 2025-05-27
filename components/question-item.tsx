"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import EditQuestionDialog, { Question } from "./edit-question-dialog";

interface Props {
  listaIndex: number;
  questaoIndex: number;
  question: Question;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onDelete: () => void;
  onUpdate: (updated: Question) => void;
}

export default function QuestionItem({
  listaIndex,
  questaoIndex,
  question,
  selected,
  onSelect,
  onDelete,
  onUpdate,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const key = `${listaIndex}-${questaoIndex}`;

  // função para gerar preview de até 50 caracteres
  const getPreview = (htmlOrText: string) => {
    const plain = htmlOrText.replace(/<[^>]+>/g, "");
    return plain.length > 50 ? plain.slice(0, 50) + "..." : plain;
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={key}>
        <AccordionTrigger>
          <div className="flex flex-col w-full gap-1">
            {/* linha 1: checkbox + título + flag */}
            <div className="flex items-center gap-2">
              <Checkbox checked={selected} onCheckedChange={onSelect} />
              <span className="font-medium">
                {question.prova} – Questão {question.number}
              </span>
              {!question.answer && <AlertCircle className="text-red-500" />}
            </div>
            {/* opcional: prévia
            <div className="text-sm text-gray-600">
              {getPreview(question.enunciadoHtml || question.enunciado)}
            </div>
            */}
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {question.prova} – Questão {question.number}
              </CardTitle>
              <CardDescription>
                <div
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: question.enunciadoHtml || question.enunciado,
                  }}
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2 space-y-2">
              {question.alternatives.map((alt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      alt.letter === question.answer
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {alt.letter.toUpperCase()}.
                  </span>
                  <span className="text-sm">{alt.text}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setOpenDialog(true)}
              >
                Editar
              </Button>
              <Button size="sm" variant="destructive" onClick={onDelete}>
                Excluir
              </Button>
            </CardFooter>
          </Card>

          <EditQuestionDialog
            open={openDialog}
            onOpenChange={setOpenDialog}
            question={question}
            onSave={(upd) => {
              onUpdate(upd);
              setOpenDialog(false);
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
