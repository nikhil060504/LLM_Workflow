import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Safe initialization
const prismaClientSingleton = () => {
    try {
        return new PrismaClient({
            log: ["error"],
        });
    } catch (e) {
        console.warn("⚠️ Failed to initialize Prisma Client (likely during build):", e);
        // Return a proxy that throws on access, preserving process/build time safety
        return new Proxy({} as PrismaClient, {
            get: () => {
                throw new Error("Prisma Client failed to initialize. Check database connection.");
            },
        });
    }
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
