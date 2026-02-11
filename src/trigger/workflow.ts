import { task, logger } from "@trigger.dev/sdk";
import { runWorkflowEngine } from "../lib/runWorkflowEngine";
import { buildExecutionBatches } from "../lib/buildExecutionBatches";
import { prisma } from "../lib/prisma";

export const runWorkflowTask = task({
  id: "run-workflow",

  run: async (payload: any) => {
    const start = Date.now();

    try {
      const { nodes, edges } = payload;

      logger.info("Workflow started");

      const batches = buildExecutionBatches(nodes, edges);
      const outputs = await runWorkflowEngine(batches, nodes, edges);

      const duration = Date.now() - start;

      // Store successful run in database
      await prisma.workflowRun.create({
        data: {
          status: "success",
          duration,
        },
      });

      logger.info("Workflow completed", { duration, outputs });

      return { success: true, duration, outputs };
    } catch (err: any) {
      const duration = Date.now() - start;

      // Store failed run in database
      await prisma.workflowRun.create({
        data: {
          status: "failed",
          duration,
        },
      });

      logger.error("Workflow failed", { error: err.message, duration });

      throw err;
    }
  },
});
