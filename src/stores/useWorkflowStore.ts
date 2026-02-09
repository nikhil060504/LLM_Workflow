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
    updateNodeOutput: (nodeId: string, output: string) => void;
    saveWorkflow: () => void;
    loadWorkflow: () => void;
};


export const useWorkflowStore = create<WorkflowState>((set, get) => ({
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

    updateNodeOutput: (nodeId: string, output: string) => {
        console.log(`📝 Updating node ${nodeId} output`);
        set((state) => ({
            nodes: state.nodes.map((n) =>
                n.id === nodeId
                    ? {
                        ...n,
                        data: {
                            ...n.data,
                            config: {
                                ...n.data.config,
                                output
                            }
                        }
                    }
                    : n
            ),
        }));
    },

    saveWorkflow: () => {
        const { nodes, edges } = get();
        localStorage.setItem(
            "workflow",
            JSON.stringify({ nodes, edges })
        );
        alert("💾 Workflow saved!");
    },

    loadWorkflow: () => {
        const data = localStorage.getItem("workflow");
        if (!data) {
            alert("❌ No saved workflow found!");
            return;
        }

        const { nodes, edges } = JSON.parse(data);
        set({ nodes, edges });
        alert("📂 Workflow loaded!");
    },


}));
