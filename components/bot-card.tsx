import { cn } from "@/lib/utils";
import { Bot, MoreVertical, Play, Pause, Trash2, Edit, MessageSquare } from "lucide-react";
import Link from "next/link";

interface BotCardProps {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "draft";
  platform: "whatsapp" | "telegram" | "both";
  conversations: number;
  lastActivity: string;
}

const platformIcons = {
  whatsapp: "/icons/whatsapp.svg",
  telegram: "/icons/telegram.svg",
  both: "both",
};

const statusStyles = {
  active: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  paused: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  draft: "bg-muted text-muted-foreground",
};

const statusLabels = {
  active: "Ativo",
  paused: "Pausado",
  draft: "Rascunho",
};

export function BotCard({
  id,
  name,
  description,
  status,
  platform,
  conversations,
  lastActivity,
}: BotCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
          </div>
        </div>
        <button className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-secondary text-muted-foreground transition-all">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusStyles[status])}>
          {statusLabels[status]}
        </span>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span>{conversations.toLocaleString()} conversas</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Última atividade: {lastActivity}
        </span>
        <div className="flex items-center gap-1">
          <Link
            href={`/dashboard/builder/${id}`}
            className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Link>
          {status === "active" ? (
            <button className="p-2 rounded-md hover:bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] transition-colors">
              <Pause className="h-4 w-4" />
            </button>
          ) : (
            <button className="p-2 rounded-md hover:bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] transition-colors">
              <Play className="h-4 w-4" />
            </button>
          )}
          <button className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
