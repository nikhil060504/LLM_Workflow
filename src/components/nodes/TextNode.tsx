"use client";

import { Handle, Position, NodeProps } from "reactflow";
import { useWorkflowStore } from "@/stores/useWorkflowStore";
import TypedHandle from "@/components/flow/TypedHandle";
import StatusDot from "@/components/flow/StatusDot";

export default function TextNode({ id, data }: NodeProps) {
    const setNodes = useWorkflowStore((s) => s.setNodes);
    const nodes = useWorkflowStore((s) => s.nodes);

    const updateText = (value: string) => {
        const updatedNodes = nodes.map((node) =>
            node.id === id
                ? {
                    ...node,
                    data: {
                        ...node.data,
                        config: { text: value },
                    },
                }
                : node
        );

        setNodes(updatedNodes);
    };

    return (
        <div className="bg-white border rounded-lg shadow w-48 relative">
            <StatusDot status={data.status} />

            <TypedHandle type="target" position={Position.Top} portType="text" />



            <div className="p-2 text-sm font-semibold border-b">Text Node</div>

            <textarea
                className="nodrag w-full p-2 text-xs outline-none resize-none"
                placeholder="Enter text..."
                rows={4}
                onChange={(e) => updateText(e.target.value)}
            />

            <TypedHandle type="source" position={Position.Bottom} portType="text" />
        </div>
    );
}
