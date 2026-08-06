import type { ISettingsRepository } from '@elektra/shared';
import type { PrismaClient } from '../client.js';

export class SettingsRepository implements ISettingsRepository {
  constructor(private readonly db: PrismaClient) {}

  async get(key: string): Promise<string | null> {
    const setting = await this.db.setting.findUnique({ where: { key } });
    return setting?.value ?? null;
  }

  async set(key: string, value: string, category = 'general'): Promise<void> {
    await this.db.setting.upsert({
      where: { key },
      create: { key, value, category },
      update: { value, category },
    });
  }

  async getByCategory(category: string): Promise<Record<string, string>> {
    const settings = await this.db.setting.findMany({ where: { category } });
    return Object.fromEntries(settings.map((s) => [s.key, s.value]));
  }
}
