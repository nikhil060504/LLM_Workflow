import { Node } from "reactflow";
import { NodeType } from "@/types/nodes";

export function createNode(nodeType: NodeType): Node {
    const labels: Record<NodeType, string> = {
        text: "Text Node",
        imageUpload: "Upload Image",
        videoUpload: "Upload Video",
        llm: "LLM",
        cropImage: "Crop Image",
        extractFrame: "Extract Frame",
    };

    return {
        id: crypto.randomUUID(),
        type:
            nodeType === "text"
                ? "textNode"
                : nodeType === "imageUpload"
                    ? "imageUploadNode"
                    : nodeType === "videoUpload"
                        ? "videoUploadNode"
                        : nodeType === "llm"
                            ? "llmNode" : nodeType === "cropImage"
? "cropImageNode"
: nodeType === "extractFrame"
? "extractFrameNode"
                            : "default",


        position: {
            x: Math.random() * 400 + 100,
            y: Math.random() * 400 + 100,
        },
        data: {
            label: labels[nodeType],
            nodeType,
            config: {},
        },
    };
}
