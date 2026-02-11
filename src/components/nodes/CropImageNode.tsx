"use client";

import TypedHandle from "@/components/flow/TypedHandle";
import StatusDot from "@/components/flow/StatusDot";
import { Position, NodeProps } from "reactflow";
import { useWorkflowStore } from "@/stores/useWorkflowStore";

export default function CropImageNode({ id, data }: NodeProps) {
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

    return (
        <div className="bg-white border rounded-lg shadow w-56 relative">
            <StatusDot status={data.status} />
            <TypedHandle type="target" position={Position.Top} portType="image" />



            <div className="p-2 text-sm font-semibold border-b">
                Crop Image
            </div>

            <div className="p-2 grid grid-cols-2 gap-2 text-xs">
                <input
                    className="nodrag border rounded p-1"
                    placeholder="X"
                    value={data.config?.x || ""}

                    onChange={(e) => updateField("x", e.target.value)}
                />
                <input
                    className="nodrag border rounded p-1"
                    placeholder="Y"
                    value={data.config?.y || ""}
                    onChange={(e) => updateField("y", e.target.value)}
                />
                <input
                    className="nodrag border rounded p-1"
                    placeholder="Width"
                    value={data.config?.width || ""}
                    onChange={(e) => updateField("width", e.target.value)}
                />
                <input
                    className="nodrag border rounded p-1"
                    placeholder="Height"
                    value={data.config?.height || ""}
                    onChange={(e) => updateField("height", e.target.value)}
                />
            </div>

            <TypedHandle type="source" position={Position.Bottom} portType="image" />
        </div>
    );
}
