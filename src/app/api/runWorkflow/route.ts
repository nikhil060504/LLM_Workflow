import { NextRequest, NextResponse } from "next/server";
import { buildExecutionBatches } from "@/lib/buildExecutionBatches";
import { runWorkflowEngine } from "@/lib/runWorkflowEngine";

export async function POST(req: NextRequest) {
    try {
        const { nodes, edges } = await req.json();

        const batches = buildExecutionBatches(nodes, edges);
        const outputs = await runWorkflowEngine(batches, nodes, edges);

        // Return outputs so frontend can update nodes
        return NextResponse.json({
            success: true,
            outputs,
            nodes // Return updated nodes with outputs
        });
    } catch (err: any) {
        console.error("Workflow failed:", err.message);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
