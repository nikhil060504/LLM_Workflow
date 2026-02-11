import { NextRequest, NextResponse } from "next/server";
import { tasks, runs } from "@trigger.dev/sdk/v3";
import type { runWorkflowTask } from "../../../trigger/workflow";

export async function POST(req: NextRequest) {
    try {
        const { nodes, edges } = await req.json();

        // Trigger the background task
        const handle = await tasks.trigger<typeof runWorkflowTask>(
            "run-workflow",
            { nodes, edges }
        );

        // Poll for result (simulating synchronous wait for simple dev workflow)
        // Max 25 seconds wait (Vercel hobby limit is 10s usually, but safe for local)
        const maxAttempts = 25;
        for (let i = 0; i < maxAttempts; i++) {
            const run = await runs.retrieve(handle.id);

            if (run.status === "COMPLETED") {
                return NextResponse.json(run.output);
            } else if (run.status === "FAILED" || run.status === "CANCELED" || run.status === "CRASHED") {
                return NextResponse.json(
                    { success: false, error: "Workflow failed or crashed" },
                    { status: 500 }
                );
            }

            // Wait 1 second before next poll
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // If polling times out, return success but no output (background processing continues)
        // Client can't see output immediately in this case
        return NextResponse.json({
            success: true,
            message: "Workflow started but output retrieval timed out. Check runs history."
        });
    } catch (err: any) {
        console.error("Failed to trigger workflow:", err.message);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
