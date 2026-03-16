"use client";

import { Header } from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import { AnalyticsChart } from "@/components/analytics-chart";
import {
  MessageSquare,
  Users,
  Clock,
  Target,
  TrendingUp,
  Filter,
} from "lucide-react";
import { useState } from "react";

const periods = ["7 dias", "30 dias", "90 dias", "12 meses"];

const stats = [
  {
    title: "Total de Conversas",
    value: "48.2K",
    change: { value: "+24%", trend: "up" as const },
    icon: MessageSquare,
  },
  {
    title: "Usuários Únicos",
    value: "12.8K",
    change: { value: "+18%", trend: "up" as const },
    icon: Users,
  },
  {
    title: "Tempo Médio de Resposta",
    value: "1.2s",
    change: { value: "-15%", trend: "up" as const },
    icon: Clock,
  },
  {
    title: "Taxa de Conversão",
    value: "32%",
    change: { value: "+8%", trend: "up" as const },
    icon: Target,
  },
];

const conversationData = [
  { name: "Jan", value: 12000, value2: 8500 },
  { name: "Fev", value: 15000, value2: 10200 },
  { name: "Mar", value: 18000, value2: 12800 },
  { name: "Abr", value: 22000, value2: 15600 },
  { name: "Mai", value: 28000, value2: 19200 },
  { name: "Jun", value: 35000, value2: 24500 },
  { name: "Jul", value: 48200, value2: 32800 },
];

const topBots = [
  { name: "Atendimento Vendas", conversations: 15420, conversion: 42 },
  { name: "Suporte Técnico", conversations: 12350, conversion: 28 },
  { name: "Agendamentos", conversations: 8900, conversion: 65 },
  { name: "FAQ Automático", conversations: 7200, conversion: 35 },
  { name: "Qualificação Leads", conversations: 4330, conversion: 52 },
];

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30 dias");

  return (
    <div className="min-h-screen">
      <Header title="Analytics" subtitle="Métricas e performance dos seus bots" />

      <div className="p-6 space-y-6">
        {/* Period Filter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Período:</span>
            <div className="flex gap-1">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
            <TrendingUp className="h-4 w-4" />
            Exportar Relatório
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart
            data={conversationData}
            title="Evolução de Conversas"
            subtitle="Total de conversas ao longo do tempo"
          />
          <AnalyticsChart
            data={conversationData}
            title="Conversas vs Conversões"
            subtitle="Comparativo de performance"
            showSecondLine
          />
        </div>

        {/* Top Bots Table */}
        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Top Bots por Performance</h3>
            <p className="text-sm text-muted-foreground">Ranking baseado em conversas e conversões</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    #
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Bot
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                    Conversas
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                    Taxa de Conversão
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {topBots.map((bot, index) => (
                  <tr
                    key={bot.name}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{bot.name}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-foreground">
                      {bot.conversations.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[hsl(var(--success))]">{bot.conversion}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${bot.conversion}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
