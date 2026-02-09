import { Edge, Node } from "reactflow";

export function topologicalSort(nodes: Node[], edges: Edge[]) {
    const inDegree: Record<string, number> = {};
    const graph: Record<string, string[]> = {};

    // init
    nodes.forEach((node) => {
        inDegree[node.id] = 0;
        graph[node.id] = [];
    });

    // build graph
    edges.forEach((edge) => {
        graph[edge.source].push(edge.target);
        inDegree[edge.target]++;
    });

    // queue for nodes with no deps
    const queue: string[] = [];
    Object.keys(inDegree).forEach((id) => {
        if (inDegree[id] === 0) queue.push(id);
    });

    const order: string[] = [];

    while (queue.length) {
        const nodeId = queue.shift()!;
        order.push(nodeId);

        for (const neighbor of graph[nodeId]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
    }

    return order;
}
