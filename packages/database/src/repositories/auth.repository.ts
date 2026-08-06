import type { IAuthRepository, AuthSession, LoginCredentials } from '@elektra/shared';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import type { PrismaClient } from '../client.js';
import { mapUser, userInclude } from '../mappers/index.js';

export class AuthRepository implements IAuthRepository {
  constructor(private readonly db: PrismaClient) {}

  async authenticate(credentials: LoginCredentials): Promise<AuthSession | null> {
    const user = await this.db.user.findUnique({
      where: { username: credentials.username },
      include: userInclude,
    });

    if (!user?.isActive) return null;

    const valid = await bcrypt.compare(credentials.password, user.passwordHash);
    if (!valid) return null;

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + (credentials.rememberMe ? 720 : 8));

    return {
      user: mapUser(user),
      token: randomBytes(32).toString('hex'),
      expiresAt,
    };
  }

  async findById(id: string) {
    const user = await this.db.user.findUnique({ where: { id }, include: userInclude });
    return user ? mapUser(user) : null;
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }
}
