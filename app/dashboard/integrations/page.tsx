"use client";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  Check,
  Plus,
  Settings,
  ExternalLink,
  Webhook,
  Database,
  CreditCard,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

const integrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Conecte seus bots ao WhatsApp Business API",
    category: "messaging",
    status: "connected",
    icon: "/icons/whatsapp.svg",
    color: "bg-green-500/10 border-green-500/50",
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Integração completa com bots do Telegram",
    category: "messaging",
    status: "available",
    icon: "/icons/telegram.svg",
    color: "bg-blue-500/10 border-blue-500/50",
  },
  {
    id: "instagram",
    name: "Instagram Direct",
    description: "Responda mensagens diretas automaticamente",
    category: "messaging",
    status: "available",
    icon: "/icons/instagram.svg",
    color: "bg-pink-500/10 border-pink-500/50",
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "Potencialize seus bots com GPT-4",
    category: "ai",
    status: "connected",
    icon: "/icons/openai.svg",
    color: "bg-emerald-500/10 border-emerald-500/50",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Processe pagamentos diretamente no chat",
    category: "payments",
    status: "available",
    icon: "/icons/stripe.svg",
    color: "bg-indigo-500/10 border-indigo-500/50",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sincronize leads com seu CRM",
    category: "crm",
    status: "available",
    icon: "/icons/hubspot.svg",
    color: "bg-orange-500/10 border-orange-500/50",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Conecte com mais de 5000 apps",
    category: "automation",
    status: "connected",
    icon: "/icons/zapier.svg",
    color: "bg-orange-500/10 border-orange-500/50",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Exporte dados para planilhas automaticamente",
    category: "data",
    status: "available",
    icon: "/icons/google-sheets.svg",
    color: "bg-green-500/10 border-green-500/50",
  },
];

const categories = [
  { id: "all", name: "Todas", icon: null },
  { id: "messaging", name: "Mensagens", icon: MessageCircle },
  { id: "ai", name: "Inteligência Artificial", icon: null },
  { id: "payments", name: "Pagamentos", icon: CreditCard },
  { id: "crm", name: "CRM", icon: null },
  { id: "automation", name: "Automação", icon: Webhook },
  { id: "data", name: "Dados", icon: Database },
];

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredIntegrations =
    selectedCategory === "all"
      ? integrations
      : integrations.filter((i) => i.category === selectedCategory);

  const connectedCount = integrations.filter(
    (i) => i.status === "connected"
  ).length;

  return (
    <div className="min-h-screen">
      <Header
        title="Integrações"
        subtitle="Conecte seus bots com suas ferramentas favoritas"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10">
              <Check className="h-5 w-5 text-[hsl(var(--success))]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {connectedCount}
              </p>
              <p className="text-sm text-muted-foreground">Conectadas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {integrations.length - connectedCount}
              </p>
              <p className="text-sm text-muted-foreground">Disponíveis</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIntegrations.map((integration) => (
            <div
              key={integration.id}
              className={cn(
                "group rounded-xl border-2 bg-card p-5 transition-all hover:shadow-lg",
                integration.status === "connected"
                  ? "border-[hsl(var(--success))]/30"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg border",
                    integration.color
                  )}
                >
                  <MessageCircle className="h-6 w-6 text-foreground" />
                </div>
                {integration.status === "connected" && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]">
                    <Check className="h-3 w-3" />
                    Conectado
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-foreground mb-1">
                {integration.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {integration.description}
              </p>

              <div className="flex items-center gap-2">
                {integration.status === "connected" ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                      <Settings className="h-4 w-4" />
                      Configurar
                    </button>
                  </>
                ) : (
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Plus className="h-4 w-4" />
                    Conectar
                  </button>
                )}
                <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Webhook Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Webhook className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Webhook Personalizado
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Conecte qualquer sistema externo usando webhooks personalizados.
                Envie e receba dados em tempo real.
              </p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                <Plus className="h-4 w-4" />
                Criar Webhook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
