export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-full">
            {/* Auth protection can be added here with Clerk's auth() */}
            {children}
        </div>
    );
}
