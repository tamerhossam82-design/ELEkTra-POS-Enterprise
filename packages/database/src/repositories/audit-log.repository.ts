import type { IAuditLogRepository } from '@elektra/shared';
import type { PrismaClient } from '../client.js';

export class AuditLogRepository implements IAuditLogRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(entry: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
  }): Promise<void> {
    await this.db.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId,
        metadata: entry.metadata ? JSON.stringify(entry.metadata) : null,
        ipAddress: entry.ipAddress,
      },
    });
  }

  async findRecent(limit: number) {
    const logs = await this.db.auditLog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { fullName: true } } },
    });

    return logs.map((log) => ({
      id: log.id,
      action: log.action,
      entity: log.entity,
      userName: log.user?.fullName ?? null,
      createdAt: log.createdAt,
    }));
  }
}
