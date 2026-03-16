"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  GitBranch,
  Zap,
  Clock,
  Send,
  Bot,
} from "lucide-react";

interface BaseNodeData {
  label: string;
  description?: string;
}

const nodeStyles = {
  message: {
    icon: MessageSquare,
    color: "border-primary bg-primary/10",
    iconColor: "text-primary",
  },
  condition: {
    icon: GitBranch,
    color: "border-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10",
    iconColor: "text-[hsl(var(--warning))]",
  },
  action: {
    icon: Zap,
    color: "border-[hsl(var(--success))] bg-[hsl(var(--success))]/10",
    iconColor: "text-[hsl(var(--success))]",
  },
  delay: {
    icon: Clock,
    color: "border-muted-foreground bg-muted",
    iconColor: "text-muted-foreground",
  },
  start: {
    icon: Bot,
    color: "border-primary bg-primary",
    iconColor: "text-primary-foreground",
  },
  end: {
    icon: Send,
    color: "border-destructive bg-destructive/10",
    iconColor: "text-destructive",
  },
};

function BaseNode({
  type,
  data,
  selected,
}: {
  type: keyof typeof nodeStyles;
  data: BaseNodeData;
  selected?: boolean;
}) {
  const style = nodeStyles[type];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "min-w-48 rounded-xl border-2 bg-card p-4 shadow-lg transition-all",
        style.color,
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            type === "start" ? "bg-primary" : "bg-secondary"
          )}
        >
          <Icon className={cn("h-5 w-5", style.iconColor)} />
        </div>
        <div>
          <h4 className="font-medium text-foreground">{data.label}</h4>
          {data.description && (
            <p className="text-xs text-muted-foreground">{data.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function StartNode({ data, selected }: NodeProps<BaseNodeData>) {
  return (
    <>
      <BaseNode type="start" data={data} selected={selected} />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-2 !border-primary !bg-background"
      />
    </>
  );
}

export function MessageNode({ data, selected }: NodeProps<BaseNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-2 !border-primary !bg-background"
      />
      <BaseNode type="message" data={data} selected={selected} />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-2 !border-primary !bg-background"
      />
    </>
  );
}

export function ConditionNode({ data, selected }: NodeProps<BaseNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-2 !border-[hsl(var(--warning))] !bg-background"
      />
      <BaseNode type="condition" data={data} selected={selected} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{ left: "30%" }}
        className="!h-3 !w-3 !border-2 !border-[hsl(var(--success))] !bg-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{ left: "70%" }}
        className="!h-3 !w-3 !border-2 !border-destructive !bg-background"
      />
    </>
  );
}

export function ActionNode({ data, selected }: NodeProps<BaseNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-2 !border-[hsl(var(--success))] !bg-background"
      />
      <BaseNode type="action" data={data} selected={selected} />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-2 !border-[hsl(var(--success))] !bg-background"
      />
    </>
  );
}

export function DelayNode({ data, selected }: NodeProps<BaseNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-2 !border-muted-foreground !bg-background"
      />
      <BaseNode type="delay" data={data} selected={selected} />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-2 !border-muted-foreground !bg-background"
      />
    </>
  );
}

export function EndNode({ data, selected }: NodeProps<BaseNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-2 !border-destructive !bg-background"
      />
      <BaseNode type="end" data={data} selected={selected} />
    </>
  );
}

export const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  condition: ConditionNode,
  action: ActionNode,
  delay: DelayNode,
  end: EndNode,
};
