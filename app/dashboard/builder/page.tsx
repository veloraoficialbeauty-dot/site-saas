"use client";

import { Header } from "@/components/header";
import dynamic from "next/dynamic";

const FlowCanvas = dynamic(
  () =>
    import("@/components/flow-builder/flow-canvas").then((mod) => mod.FlowCanvas),
  { ssr: false }
);

export default function BuilderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Flow Builder" subtitle="Crie fluxos de conversa visualmente" />
      <FlowCanvas />
    </div>
  );
}
