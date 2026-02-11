"use client";

export default function StatusDot({ status }: { status?: string }) {
    const isRunning = status === "running";
    const isSuccess = status === "success";
    const isError = status === "error" || status === "failed";
    const isIdle = !status || status === "idle";

    const getColor = () => {
        if (isRunning) return "#FFFF00"; // Bright Yellow
        if (isSuccess) return "#00FF00"; // Bright Green
        if (isError) return "#FF0000";   // Bright Red
        if (isIdle) return "#00FFFF";    // Cyan for Idle
        return "#FF00FF";               // Magenta fallback
    };

    const color = getColor();

    return (
        <div
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full border-2 border-white shadow-[0_0_8px_rgba(0,0,0,0.3)] z-[10000] flex items-center justify-center transition-all duration-300"
            style={{
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}`,
            }}
            title={`Status: ${status || "idle"}`}
        >
            <div className="text-[6px] font-bold text-black pointer-events-none">
                {status?.substring(0, 1).toUpperCase() || 'I'}
            </div>
        </div>
    );
}
