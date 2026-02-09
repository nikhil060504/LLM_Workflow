"use client";

import { Handle, Position } from "reactflow";

export default function DefaultNode({ data }: any) {
  const statusColor =
    data.status === "running"
      ? "bg-yellow-400"
      : data.status === "success"
        ? "bg-green-500"
        : data.status === "error"
          ? "bg-red-500"
          : "bg-gray-300";

  return (
    <div className="bg-white border rounded-lg px-4 py-2 shadow relative">
      <div className={`absolute top-1 right-1 w-3 h-3 rounded-full ${statusColor}`} />

      <Handle type="target" position={Position.Top} />
      <div className="text-sm font-semibold">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
