"use client";

import {
  MessageSquare,
  GitBranch,
  Zap,
  Clock,
  Send,
  Image,
  FileText,
  Bot,
  Webhook,
  Database,
} from "lucide-react";

const nodeCategories = [
  {
    name: "Básico",
    nodes: [
      {
        type: "message",
        label: "Mensagem",
        description: "Enviar texto ao usuário",
        icon: MessageSquare,
        color: "text-primary",
      },
      {
        type: "condition",
        label: "Condição",
        description: "Ramificar fluxo",
        icon: GitBranch,
        color: "text-[hsl(var(--warning))]",
      },
      {
        type: "delay",
        label: "Aguardar",
        description: "Pausar execução",
        icon: Clock,
        color: "text-muted-foreground",
      },
      {
        type: "end",
        label: "Encerrar",
        description: "Finalizar conversa",
        icon: Send,
        color: "text-destructive",
      },
    ],
  },
  {
    name: "Ações",
    nodes: [
      {
        type: "action",
        label: "Ação",
        description: "Executar tarefa",
        icon: Zap,
        color: "text-[hsl(var(--success))]",
      },
      {
        type: "action",
        label: "Webhook",
        description: "Chamar API externa",
        icon: Webhook,
        color: "text-[hsl(var(--success))]",
      },
      {
        type: "action",
        label: "Salvar Dados",
        description: "Armazenar informações",
        icon: Database,
        color: "text-[hsl(var(--success))]",
      },
    ],
  },
  {
    name: "Mídia",
    nodes: [
      {
        type: "message",
        label: "Imagem",
        description: "Enviar imagem",
        icon: Image,
        color: "text-primary",
      },
      {
        type: "message",
        label: "Documento",
        description: "Enviar arquivo",
        icon: FileText,
        color: "text-primary",
      },
    ],
  },
];

interface NodePanelProps {
  onDragStart: (
    event: React.DragEvent,
    nodeType: string,
    label: string
  ) => void;
}

export function NodePanel({ onDragStart }: NodePanelProps) {
  return (
    <div className="w-64 border-r border-border bg-card p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Componentes
      </h3>

      <div className="space-y-6">
        {nodeCategories.map((category) => (
          <div key={category.name}>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {category.name}
            </h4>
            <div className="space-y-2">
              {category.nodes.map((node, index) => {
                const Icon = node.icon;
                return (
                  <div
                    key={`${node.type}-${index}`}
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, node.type, node.label)
                    }
                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/50 cursor-grab hover:border-primary/50 hover:bg-secondary transition-colors active:cursor-grabbing"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background">
                      <Icon className={`h-4 w-4 ${node.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {node.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {node.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
