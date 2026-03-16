import { Header } from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import { BotCard } from "@/components/bot-card";
import { AnalyticsChart } from "@/components/analytics-chart";
import { Bot, MessageSquare, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total de Bots",
    value: "12",
    change: { value: "+3", trend: "up" as const },
    icon: Bot,
  },
  {
    title: "Conversas Hoje",
    value: "2.4K",
    change: { value: "+18%", trend: "up" as const },
    icon: MessageSquare,
  },
  {
    title: "Usuários Ativos",
    value: "847",
    change: { value: "+12%", trend: "up" as const },
    icon: Users,
  },
  {
    title: "Automações",
    value: "156",
    change: { value: "+8%", trend: "up" as const },
    icon: Zap,
  },
];

const recentBots = [
  {
    id: "1",
    name: "Atendimento Vendas",
    description: "Bot para qualificação de leads e vendas",
    status: "active" as const,
    platform: "whatsapp" as const,
    conversations: 1234,
    lastActivity: "há 2 min",
  },
  {
    id: "2",
    name: "Suporte Técnico",
    description: "Atendimento de suporte 24/7",
    status: "active" as const,
    platform: "both" as const,
    conversations: 856,
    lastActivity: "há 5 min",
  },
  {
    id: "3",
    name: "Agendamentos",
    description: "Bot para agendamento de consultas",
    status: "paused" as const,
    platform: "telegram" as const,
    conversations: 432,
    lastActivity: "há 1 hora",
  },
];

const chartData = [
  { name: "Seg", value: 1200, value2: 800 },
  { name: "Ter", value: 1400, value2: 920 },
  { name: "Qua", value: 1100, value2: 780 },
  { name: "Qui", value: 1800, value2: 1200 },
  { name: "Sex", value: 2200, value2: 1500 },
  { name: "Sáb", value: 1600, value2: 1100 },
  { name: "Dom", value: 1300, value2: 900 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" subtitle="Visão geral da sua plataforma" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart
            data={chartData}
            title="Conversas"
            subtitle="Últimos 7 dias"
          />
          <AnalyticsChart
            data={chartData}
            title="Engajamento"
            subtitle="Conversas vs Conversões"
            showSecondLine
          />
        </div>

        {/* Recent Bots */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Bots Recentes</h2>
            <Link
              href="/dashboard/bots"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBots.map((bot) => (
              <BotCard key={bot.id} {...bot} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Criar Novo Bot"
            description="Comece do zero ou use um template"
            href="/dashboard/builder"
            color="primary"
          />
          <QuickActionCard
            title="Ver Templates"
            description="Explore modelos prontos"
            href="/dashboard/templates"
            color="secondary"
          />
          <QuickActionCard
            title="Conectar Integração"
            description="WhatsApp, Telegram e mais"
            href="/dashboard/integrations"
            color="accent"
          />
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  color,
}: {
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
    >
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-sm text-primary">
        Começar
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
