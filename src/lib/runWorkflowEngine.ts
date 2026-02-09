import { runNode } from "./runNode";

export async function runWorkflowEngine(
  batches: string[][],
  nodes: any[],
  edges: any[]
) {
  const nodeMap: Record<string, any> = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  const nodeOutputs: Record<string, any> = {};

  for (const batch of batches) {
    console.log("Running batch:", batch);

    await Promise.all(
      batch.map(async (id) => {
        const output = await runNode(id, nodeMap, edges, nodeOutputs);
        nodeOutputs[id] = output;
      })
    );

    console.log("Batch finished\n");
  }

  console.log("Final outputs:", nodeOutputs);
  console.log("Workflow completed 🎉");
}
