"use client";

import { useWorkflowStore } from "@/stores/useWorkflowStore";
import { createNode } from "@/lib/createNode";
import { buildExecutionBatches } from "@/lib/buildExecutionBatches";

export default function LeftSidebar() {
    const addNode = useWorkflowStore((s) => s.addNode);
    const nodes = useWorkflowStore((s) => s.nodes);
    const edges = useWorkflowStore((s) => s.edges);
    const setNodeStatus = useWorkflowStore((s) => s.setNodeStatus);
    const resetNodeStatus = useWorkflowStore((s) => s.resetNodeStatus);

   const runWorkflow = async () => {
  resetNodeStatus();
  const batches = buildExecutionBatches(nodes, edges);

  for (const batch of batches) {
    batch.forEach((id) => setNodeStatus(id, "running"));
    await new Promise((res) => setTimeout(res, 800));

    try {
      const res = await fetch("/api/runWorkflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      batch.forEach((id) => setNodeStatus(id, "success"));
    } catch {
      batch.forEach((id) => setNodeStatus(id, "error"));
      return;
    }
  }
};



    return (
        <div className="p-4 space-y-3">
            <button
                onClick={runWorkflow}
                className="w-full bg-black text-white p-2 rounded mb-4"
            >
                ▶ Run Workflow
            </button>

            <h2 className="font-bold text-lg">Quick Access</h2>

            <button onClick={() => addNode(createNode("text"))} className="btn">
                Text Node
            </button>

            <button onClick={() => addNode(createNode("imageUpload"))} className="btn">
                Upload Image
            </button>

            <button onClick={() => addNode(createNode("videoUpload"))} className="btn">
                Upload Video
            </button>

            <button onClick={() => addNode(createNode("llm"))} className="btn">
                Run LLM
            </button>

            <button onClick={() => addNode(createNode("cropImage"))} className="btn">
                Crop Image
            </button>

            <button onClick={() => addNode(createNode("extractFrame"))} className="btn">
                Extract Frame
            </button>

        </div>
    );
}
