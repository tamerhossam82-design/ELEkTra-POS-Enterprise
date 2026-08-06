import type { User, UserWithRole } from '../entities/index.js';

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthSession {
  user: UserWithRole;
  token: string;
  expiresAt: Date;
}

export interface IAuthRepository {
  authenticate(credentials: LoginCredentials): Promise<AuthSession | null>;
  findById(id: string): Promise<UserWithRole | null>;
  updateLastLogin(userId: string): Promise<void>;
}

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export interface ISettingsRepository {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, category?: string): Promise<void>;
  getByCategory(category: string): Promise<Record<string, string>>;
}

export interface IAuditLogRepository {
  create(entry: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
  }): Promise<void>;
  findRecent(limit: number): Promise<
    Array<{
      id: string;
      action: string;
      entity: string;
      userName: string | null;
      createdAt: Date;
    }>
  >;
}
