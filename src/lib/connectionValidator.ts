import { Connection, Edge } from "reactflow";
import { createsCycle } from "./dagCycleCheck";
import { useWorkflowStore } from "@/stores/useWorkflowStore";

export function isValidConnection(connection: Connection): boolean {
  const sourceType = connection.sourceHandle;
  const targetType = connection.targetHandle;

  if (!sourceType || !targetType) return false;

  // Rule 1 — types must match
  if (sourceType !== targetType) return false;

  // Rule 2 — prevent self connection
  if (connection.source === connection.target) return false;

  // Rule 3 — prevent cycles
  const edges = useWorkflowStore.getState().edges;

  const newEdge: Edge = {
    id: `${connection.source}-${connection.target}`,
    source: connection.source!,
    target: connection.target!,
  };

  if (createsCycle(edges, newEdge)) return false;

  return true;
}
