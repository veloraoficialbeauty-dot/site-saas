"use client";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Calendar,
  HeadphonesIcon,
  Users,
  FileQuestion,
  Megaphone,
  Star,
  Clock,
  Bot,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "all", name: "Todos" },
  { id: "sales", name: "Vendas" },
  { id: "support", name: "Suporte" },
  { id: "marketing", name: "Marketing" },
  { id: "scheduling", name: "Agendamentos" },
];

const templates = [
  {
    id: "1",
    name: "Atendimento de Vendas",
    description:
      "Bot completo para qualificação de leads, apresentação de produtos e fechamento de vendas.",
    category: "sales",
    icon: ShoppingCart,
    popular: true,
    uses: 2340,
    rating: 4.8,
    features: ["Qualificação de leads", "Catálogo de produtos", "Checkout"],
  },
  {
    id: "2",
    name: "Agendamento de Consultas",
    description:
      "Automatize agendamentos de consultas, reuniões ou serviços com confirmação automática.",
    category: "scheduling",
    icon: Calendar,
    popular: true,
    uses: 1890,
    rating: 4.9,
    features: ["Calendário integrado", "Lembretes", "Confirmação"],
  },
  {
    id: "3",
    name: "Suporte Técnico 24/7",
    description:
      "Atendimento de suporte com triagem inteligente e escalonamento para humanos.",
    category: "support",
    icon: HeadphonesIcon,
    popular: true,
    uses: 3210,
    rating: 4.7,
    features: ["Triagem automática", "Base de conhecimento", "Escalonamento"],
  },
  {
    id: "4",
    name: "Captação de Leads",
    description:
      "Colete informações de potenciais clientes com formulários conversacionais.",
    category: "marketing",
    icon: Users,
    popular: false,
    uses: 1560,
    rating: 4.6,
    features: ["Formulários dinâmicos", "Integração CRM", "Tags automáticas"],
  },
  {
    id: "5",
    name: "FAQ Automatizado",
    description:
      "Responda perguntas frequentes automaticamente com base de conhecimento.",
    category: "support",
    icon: FileQuestion,
    popular: false,
    uses: 2100,
    rating: 4.5,
    features: ["IA para respostas", "Categorização", "Feedback"],
  },
  {
    id: "6",
    name: "Campanhas de Marketing",
    description:
      "Envie campanhas segmentadas e acompanhe métricas de engajamento.",
    category: "marketing",
    icon: Megaphone,
    popular: false,
    uses: 980,
    rating: 4.4,
    features: ["Segmentação", "A/B Testing", "Analytics"],
  },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header title="Templates" subtitle="Comece rapidamente com modelos prontos" />

      <div className="p-6 space-y-6">
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

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {template.popular && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Features */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-md text-xs bg-secondary text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-[hsl(var(--warning))]" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bot className="h-4 w-4" />
                      <span>{template.uses.toLocaleString()} usos</span>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/builder?template=${template.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Usar
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
