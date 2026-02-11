"use client";

import { useCallback } from "react";
import ReactFlow, {
    Controls,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Connection,
    type NodeChange,
    type EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "@/stores/useWorkflowStore";
import TextNode from "@/components/nodes/TextNode";
import DefaultNode from "@/components/flow/DefaultNode";
import ImageUploadNode from "@/components/nodes/ImageUploadNode";
import VideoUploadNode from "@/components/nodes/VideoUploadNode";
import LLMNode from "@/components/nodes/LLMNode";
import CropImageNode from "@/components/nodes/CropImageNode";
import ExtractFrameNode from "@/components/nodes/ExtractFrameNode";
import { isValidConnection } from "@/lib/connectionValidator";


const nodeTypes = {
    default: DefaultNode,
    textNode: TextNode,
    imageUploadNode: ImageUploadNode,
    videoUploadNode: VideoUploadNode,
    llmNode: LLMNode,
    cropImageNode: CropImageNode,
    extractFrameNode: ExtractFrameNode,
};

export default function CanvasArea() {
    const nodes = useWorkflowStore((s) => s.nodes);
    const edges = useWorkflowStore((s) => s.edges);
    const setNodes = useWorkflowStore((s) => s.setNodes);
    const setEdges = useWorkflowStore((s) => s.setEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes(applyNodeChanges(changes, nodes));
        },
        [nodes, setNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges(applyEdgeChanges(changes, edges));
        },
        [edges, setEdges]
    );

    const onConnect = useCallback(
        (params: Connection) => {
            if (isValidConnection(params)) {
                setEdges(addEdge(params, edges));
            }
        },
        [edges, setEdges]
    );

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                isValidConnection={isValidConnection}
                fitView
                // Force re-render when nodes array reference changes
                key={nodes.length}
            >
                <Controls />
            </ReactFlow>
        </div>
    );
}
