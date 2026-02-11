"use client";
import { useEffect, useState } from "react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

type Run = {
    id: string;
    status: string;
    duration: number;
    createdAt: string;
};

export default function RightSidebar() {
    const [runs, setRuns] = useState<Run[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRuns = async () => {
        try {
            const res = await fetch("/api/workflowRuns");
            if (res.ok) {
                const data = await res.json();
                setRuns(data);
            }
        } catch (error) {
            // fail silently
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRuns();
        // Refresh every 10 seconds (reduced frequency)
        const interval = setInterval(fetchRuns, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full border-l p-3 overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <span className="text-sm font-semibold">Account</span>
                <div className="flex items-center">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/sign-in" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-xs bg-black text-white px-2 py-1 rounded">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>

            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">History</h2>
                <button
                    onClick={fetchRuns}
                    className="text-xs text-gray-500 hover:text-black"
                    title="Refresh History"
                >
                    🔄
                </button>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : runs.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No workflows run yet. Click "Run Workflow" to start!
                </p>
            ) : (
                runs.map((run) => (
                    <div
                        key={run.id}
                        className="border rounded p-2 mb-2 text-sm bg-white"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-xs">
                                {new Date(run.createdAt).toLocaleTimeString()}
                            </span>
                            <span
                                className={`px-2 py-0.5 rounded text-white text-xs ${run.status === "success"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                    }`}
                            >
                                {run.status}
                            </span>
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                            {run.duration}ms
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
