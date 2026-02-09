import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-8">
            <div className="text-center">
                <h1 className="mb-4 text-6xl font-bold text-gray-900">
                    Galaxy AI
                </h1>
                <p className="mb-8 text-xl text-gray-600">
                    Production-ready Next.js 14 SaaS Platform
                </p>
                <Link
                    href="/dashboard"
                    className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}
