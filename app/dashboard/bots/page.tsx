"use client";

import { Header } from "@/components/header";
import { BotCard } from "@/components/bot-card";
import { cn } from "@/lib/utils";
import { Search, Filter, Grid, List, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const bots = [
  {
    id: "1",
    name: "Atendimento Vendas",
    description: "Bot para qualificação de leads e vendas automatizadas",
    status: "active" as const,
    platform: "whatsapp" as const,
    conversations: 15420,
    lastActivity: "há 2 min",
  },
  {
    id: "2",
    name: "Suporte Técnico",
    description: "Atendimento de suporte 24/7 com escalonamento",
    status: "active" as const,
    platform: "both" as const,
    conversations: 12350,
    lastActivity: "há 5 min",
  },
  {
    id: "3",
    name: "Agendamentos",
    description: "Bot para agendamento de consultas e reuniões",
    status: "paused" as const,
    platform: "telegram" as const,
    conversations: 8900,
    lastActivity: "há 1 hora",
  },
  {
    id: "4",
    name: "FAQ Automático",
    description: "Respostas automáticas para perguntas frequentes",
    status: "active" as const,
    platform: "whatsapp" as const,
    conversations: 7200,
    lastActivity: "há 10 min",
  },
  {
    id: "5",
    name: "Captação de Leads",
    description: "Coleta dados de potenciais clientes",
    status: "draft" as const,
    platform: "both" as const,
    conversations: 0,
    lastActivity: "há 2 dias",
  },
  {
    id: "6",
    name: "Pesquisa de Satisfação",
    description: "Coleta feedback dos clientes após atendimento",
    status: "active" as const,
    platform: "whatsapp" as const,
    conversations: 3450,
    lastActivity: "há 30 min",
  },
];

const statusFilters = [
  { id: "all", name: "Todos" },
  { id: "active", name: "Ativos" },
  { id: "paused", name: "Pausados" },
  { id: "draft", name: "Rascunhos" },
];

export default function BotsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredBots = bots.filter((bot) => {
    const matchesSearch =
      bot.name.toLowerCase().includes(search.toLowerCase()) ||
      bot.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || bot.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <Header title="Meus Bots" subtitle="Gerencie todos os seus chatbots" />

      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar bots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full sm:w-64 rounded-lg border border-input bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1">
              {statusFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    statusFilter === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center rounded-lg border border-border p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "list"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Create Button */}
            <Link
              href="/dashboard/builder"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Novo Bot
            </Link>
          </div>
        </div>

        {/* Bots Grid/List */}
        {filteredBots.length > 0 ? (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "flex flex-col gap-3"
            )}
          >
            {filteredBots.map((bot) => (
              <BotCard key={bot.id} {...bot} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum bot encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou crie um novo bot.
            </p>
            <Link
              href="/dashboard/builder"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Criar Novo Bot
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
