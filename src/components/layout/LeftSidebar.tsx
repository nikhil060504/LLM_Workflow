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
    const updateNodeOutput = useWorkflowStore((s) => s.updateNodeOutput);
    const saveWorkflow = useWorkflowStore((s) => s.saveWorkflow);
    const loadWorkflow = useWorkflowStore((s) => s.loadWorkflow);

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

                if (!data.success) throw new Error(data.error || "Workflow failed");

                // Update outputs for LLM nodes
                if (data.outputs) {
                    Object.entries(data.outputs).forEach(([nodeId, output]) => {
                        updateNodeOutput(nodeId, output as string);
                    });
                }

                batch.forEach((id) => setNodeStatus(id, "success"));
            } catch (err: any) {
                console.error("Workflow error:", err?.message || err);
                batch.forEach((id) => setNodeStatus(id, "error"));
                alert(`❌ Workflow failed: ${err?.message || "Unknown error"}`);
                return;
            }
        }

        alert("✅ Workflow completed successfully!");
    };



    return (
        <div className="p-4 space-y-3">
            <button
                onClick={runWorkflow}
                className="w-full bg-black text-white p-2 rounded mb-4 hover:bg-gray-800 transition"
            >
                ▶ Run Workflow
            </button>

            <button
                onClick={saveWorkflow}
                className="w-full border p-2 rounded mb-2 hover:bg-gray-50 transition"
            >
                💾 Save to Browser
            </button>

            <button
                onClick={loadWorkflow}
                className="w-full border p-2 rounded mb-4 hover:bg-gray-50 transition"
            >
                📂 Load from Browser
            </button>

            <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-2 text-sm text-gray-600">File Operations</h3>
                <button
                    onClick={() => {
                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
                        const downloadAnchorNode = document.createElement('a');
                        downloadAnchorNode.setAttribute("href", dataStr);
                        downloadAnchorNode.setAttribute("download", "workflow.json");
                        document.body.appendChild(downloadAnchorNode);
                        downloadAnchorNode.click();
                        downloadAnchorNode.remove();
                    }}
                    className="w-full border p-2 rounded mb-2 bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                >
                    ⬇️ Export JSON
                </button>

                <label className="w-full border p-2 rounded mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer flex justify-center items-center">
                    <span>⬆️ Import JSON</span>
                    <input
                        type="file"
                        className="hidden"
                        accept=".json"
                        onChange={(e) => {
                            const fileReader = new FileReader();
                            if (e.target.files && e.target.files[0]) {
                                fileReader.readAsText(e.target.files[0], "UTF-8");
                                fileReader.onload = (e) => {
                                    try {
                                        const fileResult = e.target?.result;
                                        if (typeof fileResult === 'string') {
                                            const parsedData = JSON.parse(fileResult);
                                            if (parsedData.nodes && parsedData.edges) {
                                                useWorkflowStore.getState().setNodes(parsedData.nodes);
                                                useWorkflowStore.getState().setEdges(parsedData.edges);
                                                alert("✅ Workflow imported successfully!");
                                            } else {
                                                alert("❌ Invalid workflow file format");
                                            }
                                        }
                                    } catch (error) {
                                        console.error("Error importing file:", error);
                                        alert("❌ Failed to parse JSON file");
                                    }
                                };
                            }
                        }}
                    />
                </label>
            </div>

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
