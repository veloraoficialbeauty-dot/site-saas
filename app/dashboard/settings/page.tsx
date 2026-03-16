"use client";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Building2,
  Palette,
  Globe,
  Key,
} from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "profile", name: "Perfil", icon: User },
  { id: "notifications", name: "Notificações", icon: Bell },
  { id: "security", name: "Segurança", icon: Shield },
  { id: "billing", name: "Faturamento", icon: CreditCard },
  { id: "team", name: "Equipe", icon: Building2 },
  { id: "appearance", name: "Aparência", icon: Palette },
  { id: "api", name: "API Keys", icon: Key },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen">
      <Header title="Configurações" subtitle="Gerencie sua conta e preferências" />

      <div className="p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 max-w-2xl">
            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "billing" && <BillingSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Perfil</h2>
        <p className="text-sm text-muted-foreground">
          Atualize suas informações pessoais
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Alterar foto
            </button>
            <p className="mt-2 text-xs text-muted-foreground">
              JPG, PNG ou GIF. Máximo 2MB.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome
            </label>
            <input
              type="text"
              defaultValue="João Silva"
              className="w-full h-10 rounded-lg border border-input bg-secondary px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Sobrenome
            </label>
            <input
              type="text"
              defaultValue="Santos"
              className="w-full h-10 rounded-lg border border-input bg-secondary px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue="joao@empresa.com"
            className="w-full h-10 rounded-lg border border-input bg-secondary px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Empresa
          </label>
          <input
            type="text"
            defaultValue="Empresa LTDA"
            className="w-full h-10 rounded-lg border border-input bg-secondary px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Notificações</h2>
        <p className="text-sm text-muted-foreground">
          Configure como você recebe notificações
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        {[
          {
            title: "Notificações por email",
            description: "Receba atualizações importantes por email",
          },
          {
            title: "Alertas de bot",
            description: "Notificações quando um bot parar de funcionar",
          },
          {
            title: "Relatórios semanais",
            description: "Resumo semanal de performance dos bots",
          },
          {
            title: "Novidades e atualizações",
            description: "Fique por dentro das novidades da plataforma",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <label className="relative inline-flex cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-foreground after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Segurança</h2>
        <p className="text-sm text-muted-foreground">
          Proteja sua conta com configurações de segurança
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div>
          <h3 className="font-medium text-foreground mb-4">Alterar senha</h3>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Senha atual"
              className="w-full h-10 rounded-lg border border-input bg-secondary px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="password"
              placeholder="Nova senha"
              className="w-full h-10 rounded-lg border border-input bg-secondary px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="password"
              placeholder="Confirmar nova senha"
              className="w-full h-10 rounded-lg border border-input bg-secondary px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Atualizar senha
            </button>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">
                Autenticação de dois fatores
              </p>
              <p className="text-sm text-muted-foreground">
                Adicione uma camada extra de segurança
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
              Ativar 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Faturamento</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie seu plano e pagamentos
        </p>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border-2 border-primary bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Plano Atual
            </span>
            <h3 className="text-2xl font-bold text-foreground mt-2">Pro</h3>
            <p className="text-muted-foreground">R$ 97/mês</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Upgrade
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-foreground">10</p>
            <p className="text-sm text-muted-foreground">Bots ativos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">50K</p>
            <p className="text-sm text-muted-foreground">Mensagens/mês</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Integrações</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-medium text-foreground mb-4">Método de pagamento</h3>
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
          <div className="flex items-center gap-3">
            <div className="h-10 w-14 rounded bg-background flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">**** **** **** 4242</p>
              <p className="text-sm text-muted-foreground">Expira 12/25</p>
            </div>
          </div>
          <button className="text-sm text-primary hover:underline">
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}
