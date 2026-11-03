import { PrismaClient } from "../../generated/prisma";

// One client per server process. In development, hot reloads re-run this file,
// so keep the client on globalThis instead of opening new connections each time.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
