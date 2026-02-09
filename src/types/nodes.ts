export type NodeType =
  | "text"
  | "imageUpload"
  | "videoUpload"
  | "llm"
  | "cropImage"
  | "extractFrame";

export interface BaseNodeData {
  label: string;
  nodeType: NodeType;
  config: Record<string, any>;
  status?: NodeStatus;
}

export type NodeStatus = "idle" | "running" | "success" | "error";

