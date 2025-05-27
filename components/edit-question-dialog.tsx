"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCheck, Plus, Trash2 } from "lucide-react";

export interface Alternative {
  letter: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  number: string;
  prova: string;
  probabilidade?: string;
  enunciado: string;
  enunciadoHtml?: string;
  alternatives: Alternative[];
  answer?: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question;
  onSave: (updated: Question) => void;
}

export default function EditQuestionDialog({
  open,
  onOpenChange,
  question,
  onSave,
}: Props) {
  const [form, setForm] = useState<Question>(question);

  useEffect(() => {
    setForm(question);
  }, [question]);

  const updateField = (key: keyof Question, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateAlt = (
    idx: number,
    key: keyof Alternative,
    value: any
  ) => {
    setForm((prev) => {
      const alts = [...prev.alternatives];
      alts[idx] = { ...alts[idx], [key]: value };
      return { ...prev, alternatives: alts };
    });
  };

  const addAlternative = () => {
    setForm((prev) => ({
      ...prev,
      alternatives: [
        ...prev.alternatives,
        { letter: "", text: "", isCorrect: false },
      ],
    }));
  };

  const removeAlternative = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      alternatives: prev.alternatives.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = () => {
    // garante que o campo `answer` reflita a alternativa marcada
    const correct = form.alternatives.find((a) => a.isCorrect);
    onSave({ ...form, answer: correct?.letter });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Editar Questão #{question.number}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Número</Label>
              <Input
                value={form.number}
                onChange={(e) =>
                  updateField("number", e.target.value)
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Prova</Label>
              <Input
                value={form.prova}
                onChange={(e) =>
                  updateField("prova", e.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Probabilidade</Label>
            <Input
              value={form.probabilidade || ""}
              onChange={(e) =>
                updateField("probabilidade", e.target.value)
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Enunciado (Markdown / HTML)</Label>
            <Textarea
              rows={6}
              value={form.enunciado}
              onChange={(e) =>
                updateField("enunciado", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Alternativas</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={addAlternative}
              >
                <Plus size={16} /> Adicionar
              </Button>
            </div>
            {form.alternatives.map((alt, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[auto,1fr,auto] gap-2"
              >
                <Input
                  placeholder="Letra"
                  value={alt.letter}
                  onChange={(e) =>
                    updateAlt(idx, "letter", e.target.value)
                  }
                  className="w-12"
                />
                <Input
                  placeholder="Texto"
                  value={alt.text}
                  onChange={(e) =>
                    updateAlt(idx, "text", e.target.value)
                  }
                />
                <div className="flex items-center gap-1">
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={alt.isCorrect}
                      onChange={(e) =>
                        updateAlt(
                          idx,
                          "isCorrect",
                          e.target.checked
                        )
                      }
                    />
                    <CheckCheck size={16} />
                  </label>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeAlternative(idx)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
