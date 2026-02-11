import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        // Fetch latest 10 workflow runs, ordered by most recent first
        const runs = await prisma.workflowRun.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        return NextResponse.json(runs);
    } catch (error: any) {
        console.error("❌ Failed to fetch workflow runs:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        return NextResponse.json(
            { error: "Failed to fetch workflow runs", details: error.message },
            { status: 500 }
        );
    }
}
