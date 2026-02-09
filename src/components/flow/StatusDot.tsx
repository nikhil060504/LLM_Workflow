export default function StatusDot({ status }: { status?: string }) {
    const color =
        status === "running"
            ? "bg-yellow-400"
            : status === "success"
                ? "bg-green-500"
                : status === "error"
                    ? "bg-red-500"
                    : "bg-gray-400";

    return (
        <div
            className={`absolute top-2 right-2 w-6 h-6 rounded-full ${color} border-2 border-white shadow-lg transition-all duration-300`}
        />
    );
}
