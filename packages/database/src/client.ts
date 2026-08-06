import { PrismaClient } from './generated/client/index.js';

let prisma: PrismaClient | null = null;

export function getPrismaClient(databaseUrl?: string): PrismaClient {
  if (!prisma) {
    if (databaseUrl) {
      process.env['DATABASE_URL'] = databaseUrl;
    }
    prisma = new PrismaClient();
  }
  return prisma;
}

export function disconnectPrisma(): Promise<void> {
  if (prisma) {
    const client = prisma;
    prisma = null;
    return client.$disconnect();
  }
  return Promise.resolve();
}

export type { PrismaClient };
