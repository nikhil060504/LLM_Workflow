import { Edge } from "reactflow";

export function createsCycle(edges: Edge[], newEdge: Edge): boolean {
  const graph: Record<string, string[]> = {};

  // Build adjacency list
  edges.forEach((edge) => {
    if (!graph[edge.source]) graph[edge.source] = [];
    graph[edge.source].push(edge.target);
  });

  // add new edge temporarily
  if (!graph[newEdge.source]) graph[newEdge.source] = [];
  graph[newEdge.source].push(newEdge.target);

  // DFS to detect cycle
  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(node: string): boolean {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const neighbor of graph[node] || []) {
      if (dfs(neighbor)) return true;
    }

    stack.delete(node);
    return false;
  }

  return Object.keys(graph).some(dfs);
}
