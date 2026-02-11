import { NextRequest, NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk/v3";
import type { runWorkflowTask } from "../../../trigger/workflow";

export async function POST(req: NextRequest) {
    try {
        const { nodes, edges } = await req.json();

        // Trigger the background task
        const handle = await tasks.trigger<typeof runWorkflowTask>(
            "run-workflow",
            { nodes, edges }
        );

        return NextResponse.json({
            success: true,
            taskId: handle.id
        });
    } catch (err: any) {
        console.error("Failed to trigger workflow:", err.message);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
