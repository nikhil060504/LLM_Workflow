"use client";

export default function StatusDot({ status }: { status?: string }) {
    const isRunning = status === "running";
    const isSuccess = status === "success";
    const isError = status === "error" || status === "failed";
    const isIdle = !status || status === "idle";

    // ✅ Using Emojis for 100% visibility confirmation
    const getEmoji = () => {
        if (isRunning) return "🟡"; // Running
        if (isSuccess) return "🟢"; // Success
        if (isError) return "🔴";   // Failed
        return "🔵";               // Idle
    };

    return (
        <div
            className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center z-[10000] drop-shadow-md select-none pointer-events-none"
            title={`Status: ${status || "idle"}`}
            style={{ fontSize: '24px' }}
        >
            {getEmoji()}
        </div>
    );
}
