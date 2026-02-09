import { Edge, Node } from "reactflow";

export function buildExecutionBatches(nodes: Node[], edges: Edge[]) {
    const inDegree: Record<string, number> = {};
    const graph: Record<string, string[]> = {};

    nodes.forEach((node) => {
        inDegree[node.id] = 0;
        graph[node.id] = [];
    });

    edges.forEach((edge) => {
        graph[edge.source].push(edge.target);
        inDegree[edge.target]++;
    });

    const batches: string[][] = [];
    let queue = Object.keys(inDegree).filter((id) => inDegree[id] === 0);

    while (queue.length) {
        batches.push(queue);
        const nextQueue: string[] = [];

        for (const nodeId of queue) {
            for (const neighbor of graph[nodeId]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    nextQueue.push(neighbor);
                }
            }
        }

        queue = nextQueue;
    }

    return batches;
}
