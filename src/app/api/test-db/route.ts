export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Simple connectivity check
        await prisma.$connect();

        // Count runs as a functional test
        const count = await prisma.workflowRun.count();

        return NextResponse.json({
            success: true,
            message: "Database connection successful",
            runCount: count
        });
    } catch (error: any) {
        console.error("❌ Database connection failed:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
