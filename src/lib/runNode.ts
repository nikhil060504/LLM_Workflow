import { runGemini } from "./gemini";

export async function runNode(
    nodeId: string,
    nodeMap: any,
    edges: any[],
    outputs: Record<string, any>
) {
    const node = nodeMap[nodeId];
    const nodeType = node?.data?.nodeType;

    console.log(`Running node ${nodeId} (${nodeType})`);

    // 🔍 find incoming edges (inputs)
    const incomingEdges = edges.filter((e) => e.target === nodeId);
    const inputValues = incomingEdges.map((e) => outputs[e.source]);

    // TEXT NODE
    if (nodeType === "text") {
        const text = node.data.config?.text || "";
        console.log("Text output:", text);
        return text;
    }

    // LLM NODE
    if (nodeType === "llm") {
        const config = node.data.config || {};
        const systemPrompt = config.systemPrompt || "";

        const incomingEdges = edges.filter((e) => e.target === nodeId);
        const inputValues = incomingEdges.map((e) => outputs[e.source]);
        const previousText = inputValues.join("\n");

        if (!systemPrompt && !previousText) {
            throw new Error("LLM node has no input!");
        }

        const result = await runGemini(systemPrompt, previousText);
        console.log("LLM result:", result);
        return result;
    }


    // default
    await new Promise((res) => setTimeout(res, 1000));
    return "done";
}
