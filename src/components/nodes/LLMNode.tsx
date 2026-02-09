"use client";
import TypedHandle from "@/components/flow/TypedHandle";
import StatusDot from "@/components/flow/StatusDot";
import { Position, NodeProps } from "reactflow";
import { useWorkflowStore } from "@/stores/useWorkflowStore";

export default function LLMNode({ id, data }: NodeProps) {
    const nodes = useWorkflowStore((s) => s.nodes);
    const setNodes = useWorkflowStore((s) => s.setNodes);

    const updateField = (field: string, value: string) => {
        const updatedNodes = nodes.map((node) =>
            node.id === id
                ? {
                    ...node,
                    data: {
                        ...node.data,
                        config: {
                            ...node.data.config,
                            [field]: value,
                        },
                    },
                }
                : node
        );

        setNodes(updatedNodes);
    };

    const output = data?.config?.output || "";

    return (
        <div className="bg-white border rounded-lg shadow w-64 relative">
            <StatusDot status={data.status} />
            <TypedHandle type="target" position={Position.Top} portType="text" />

            <TypedHandle type="target" position={Position.Left} portType="image" />

            <div className="p-2 text-sm font-semibold border-b">LLM Node</div>

            <div className="p-2 space-y-2">
                <textarea
                    className="nodrag w-full text-xs border rounded p-1"
                    placeholder="System prompt..."
                    rows={2}
                    value={data?.config?.systemPrompt || ""}
                    onChange={(e) => updateField("systemPrompt", e.target.value)}
                />

                <textarea
                    className="nodrag w-full text-xs border rounded p-1"
                    placeholder="User message..."
                    rows={3}
                    value={data?.config?.userMessage || ""}
                    onChange={(e) => updateField("userMessage", e.target.value)}
                />

                {/* Output Display */}
                {output ? (
                    <div className="nodrag w-full text-xs border rounded p-2 bg-green-50 max-h-32 overflow-y-auto">
                        <div className="font-semibold text-green-700 mb-1">✅ Output:</div>
                        <div className="text-gray-700 whitespace-pre-wrap">{output}</div>
                    </div>
                ) : (
                    <div className="text-[10px] text-gray-400 italic">
                        Output will appear here after run
                    </div>
                )}
            </div>

            <TypedHandle type="source" position={Position.Bottom} portType="text" />
        </div>
    );
}
