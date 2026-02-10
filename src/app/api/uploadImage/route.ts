import { NextRequest, NextResponse } from "next/server";
import { transloadit } from "@/lib/transloadit";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
    let tempFilePath: string | null = null;

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file" }, { status: 400 });
        }

        // Convert to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Create temporary file (Transloadit SDK needs file path)
        tempFilePath = path.join(os.tmpdir(), `upload-${Date.now()}-${file.name}`);
        await writeFile(tempFilePath, buffer);

        // Create assembly with file - wait for completion!
        const result = await transloadit.createAssembly({
            params: {
                template_id: process.env.TRANSLOADIT_TEMPLATE_ID,
            },
            files: {
                file: tempFilePath,
            },
            waitForCompletion: true, // Wait until processing finishes
        });

        console.log("✅ Assembly created:", result.assembly_id);

        // Extract CDN URL - try multiple possible locations
        let cdnUrl = null;

        // Option 1: uploads array
        if (result.uploads && result.uploads.length > 0 && result.uploads[0].ssl_url) {
            cdnUrl = result.uploads[0].ssl_url;
            console.log("Found URL in uploads array");
        }
        // Option 2: results[:original]
        else if (result.results && result.results[":original"] && result.results[":original"][0]?.ssl_url) {
            cdnUrl = result.results[":original"][0].ssl_url;
            console.log("Found URL in results[:original]");
        }

        if (!cdnUrl) {
            console.error("❌ No CDN URL found");
            console.log("Full result object keys:", Object.keys(result));
            console.log("Uploads:", result.uploads);
            console.log("Results:", result.results);
            throw new Error("No CDN URL in response");
        }

        console.log("✅ Upload successful:", cdnUrl);
        return NextResponse.json({ url: cdnUrl });

    } catch (error: any) {
        console.error("❌ Transloadit error:", error.message);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    } finally {
        // Clean up temp file
        if (tempFilePath) {
            try {
                await unlink(tempFilePath);
            } catch (err) {
                console.error("Failed to delete temp file:", err);
            }
        }
    }
}
