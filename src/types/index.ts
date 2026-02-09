// Common TypeScript types and interfaces

export interface User {
    id: string;
    email: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface DashboardProps {
    children?: React.ReactNode;
}
