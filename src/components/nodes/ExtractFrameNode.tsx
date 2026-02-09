"use client";
import TypedHandle from "@/components/flow/TypedHandle";
import StatusDot from "@/components/flow/StatusDot";
import { Position, NodeProps } from "reactflow";
import { useWorkflowStore } from "@/stores/useWorkflowStore";

export default function ExtractFrameNode({ id }: NodeProps) {
    const nodes = useWorkflowStore((s) => s.nodes);
    const setNodes = useWorkflowStore((s) => s.setNodes);

    const updateTimestamp = (value: string) => {
        const updatedNodes = nodes.map((node) =>
            node.id === id
                ? {
                    ...node,
                    data: {
                        ...node.data,
                        config: { timestamp: value },
                    },
                }
                : node
        );

        setNodes(updatedNodes);
    };

    return (
        <div className="bg-white border rounded-lg shadow w-56 relative">
            <StatusDot status={data.status} />
            <TypedHandle type="target" position={Position.Top} portType="video" />



            <div className="p-2 text-sm font-semibold border-b">
                Extract Frame
            </div>

            <div className="p-2 text-xs">
                <input
                    className="nodrag border rounded p-1 w-full"
                    placeholder="Timestamp (sec)"
                    value={data.config?.timestamp || ""}

                    onChange={(e) => updateTimestamp(e.target.value)}
                />
            </div>


            <TypedHandle type="source" position={Position.Bottom} portType="image" />

        </div>
    );
}
