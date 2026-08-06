import type { IUserRepository } from '@elektra/shared';
import type { PrismaClient } from '../client.js';
import { mapSimpleUser } from '../mappers/index.js';

export class UserRepository implements IUserRepository {
  constructor(private readonly db: PrismaClient) {}

  async findByUsername(username: string) {
    const user = await this.db.user.findUnique({ where: { username } });
    return user ? mapSimpleUser(user) : null;
  }

  async findById(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });
    return user ? mapSimpleUser(user) : null;
  }
}
