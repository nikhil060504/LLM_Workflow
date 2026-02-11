"use client";
import { useEffect, useState } from "react";

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
            console.error("Failed to fetch workflow runs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRuns();
        // Refresh every 5 seconds
        const interval = setInterval(fetchRuns, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full border-l p-3 overflow-y-auto">
            <h2 className="font-semibold mb-3">Workflow History</h2>

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
