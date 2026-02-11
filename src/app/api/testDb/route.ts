import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        console.log("🔍 Testing database connection...");
        console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

        // Simple connectivity test
        await prisma.$connect();
        console.log("✅ Database connected successfully");

        // Try to query
        const count = await prisma.workflowRun.count();
        console.log("✅ WorkflowRun count:", count);

        return NextResponse.json({
            success: true,
            connected: true,
            count
        });
    } catch (error: any) {
        console.error("❌ Database test failed:");
        console.error("Error:", error);

        return NextResponse.json(
            {
                success: false,
                error: error.message,
                code: error.code,
                DATABASE_URL_SET: !!process.env.DATABASE_URL
            },
            { status: 500 }
        );
    }
}
