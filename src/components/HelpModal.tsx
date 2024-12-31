import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle } from 'lucide-react'

export function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como usar Metas 2025</DialogTitle>
          <DialogDescription>
            Defina suas metas para 2025 seguindo o formato:
            "Eu [verbo] [objetivo] até [data]"
            
            Exemplo: "Eu vou aprender Python até 01/05/2025"

            Adicione até 100 metas para traçar seus objetivos para o ano.
            Você pode editar ou excluir suas metas a qualquer momento.
            Suas metas são salvas automaticamente no seu navegador.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

