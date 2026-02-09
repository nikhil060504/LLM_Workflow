import { create } from "zustand";
import { Node, Edge } from "reactflow";

type WorkflowState = {
    nodes: Node[];
    edges: Edge[];
    addNode: (node: Node) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    setNodeStatus: (nodeId: string, status: string) => void;
    resetNodeStatus: () => void;
};


export const useWorkflowStore = create<WorkflowState>((set) => ({
    nodes: [],
    edges: [],

    addNode: (node) =>
        set((state) => ({
            nodes: [...state.nodes, node],
        })),


    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    setNodeStatus: (nodeId: string, status: string) => {
        console.log(`🔄 Updating node ${nodeId} status to ${status}`);
        set((state) => {
            const newNodes = state.nodes.map((n) =>
                n.id === nodeId
                    ? { ...n, data: { ...n.data, status } }
                    : n
            );
            console.log("New nodes array created", newNodes.find(n => n.id === nodeId)?.data.status);
            return { nodes: newNodes };
        });
    },
    resetNodeStatus: () => {
        console.log("🔄 Resetting all node statuses to idle");
        set((state) => ({
            nodes: state.nodes.map((n) => ({
                ...n,
                data: { ...n.data, status: "idle" },
            })),
        }));
    },

}));
