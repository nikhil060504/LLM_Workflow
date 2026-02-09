"use client";

import { Handle, Position } from "reactflow";
import { PortType } from "@/types/ports";

interface Props {
    type: "source" | "target";
    position: Position;
    portType: PortType;
}

export default function TypedHandle({ type, position, portType }: Props) {
    return (
        <Handle
            type={type}
            position={position}
            id={portType}
            style={{
                background:
                    portType === "text"
                        ? "#2563eb"
                        : portType === "image"
                            ? "#16a34a"
                            : "#ea580c",
            }}
        />
    );
}
