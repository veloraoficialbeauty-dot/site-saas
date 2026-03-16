"use client";

import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "./custom-nodes";
import { NodePanel } from "./node-panel";
import { Save, Play, Undo, Redo, ZoomIn, ZoomOut } from "lucide-react";

const initialNodes: Node[] = [
  {
    id: "start-1",
    type: "start",
    position: { x: 250, y: 50 },
    data: { label: "Início", description: "Ponto de entrada" },
  },
  {
    id: "message-1",
    type: "message",
    position: { x: 250, y: 180 },
    data: { label: "Boas-vindas", description: "Olá! Como posso ajudar?" },
  },
  {
    id: "condition-1",
    type: "condition",
    position: { x: 250, y: 320 },
    data: { label: "Verificar opção", description: "Usuário escolheu?" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "start-1",
    target: "message-1",
    animated: true,
    style: { stroke: "hsl(168, 84%, 50%)" },
  },
  {
    id: "e2-3",
    source: "message-1",
    target: "condition-1",
    animated: true,
    style: { stroke: "hsl(168, 84%, 50%)" },
  },
];

interface FlowCanvasProps {
  botName?: string;
}

export function FlowCanvas({ botName = "Novo Bot" }: FlowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "hsl(168, 84%, 50%)" },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow/type");
      const label = event.dataTransfer.getData("application/reactflow/label");

      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label, description: "Clique para editar" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    label: string
  ) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType);
    event.dataTransfer.setData("application/reactflow/label", label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      <NodePanel onDragStart={onDragStart} />

      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Undo className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Redo className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-border mx-2" />
            <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <ZoomOut className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
              <Play className="h-4 w-4" />
              Testar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Save className="h-4 w-4" />
              Salvar
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div ref={reactFlowWrapper} className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: "hsl(168, 84%, 50%)", strokeWidth: 2 },
            }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="hsl(0, 0%, 20%)"
            />
            <Controls
              className="!bg-card !border-border !rounded-lg !shadow-lg [&>button]:!bg-secondary [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-muted"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
