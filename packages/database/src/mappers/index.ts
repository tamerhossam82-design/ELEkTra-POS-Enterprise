import type { User, UserWithRole, RoleWithPermissions, Permission } from '@elektra/shared';
import type { PrismaClient } from './client.js';

type DbUser = {
  id: string;
  username: string;
  email: string | null;
  fullName: string;
  roleId: string;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  role: {
    id: string;
    name: string;
    description: string | null;
    isSystem: boolean;
    createdAt: Date;
    updatedAt: Date;
    permissions: Array<{
      permission: {
        id: string;
        name: string;
        module: string;
        action: string;
        description: string | null;
      };
    }>;
  };
};

export function mapPermission(p: DbUser['role']['permissions'][0]['permission']): Permission {
  return {
    id: p.id,
    name: p.name,
    module: p.module,
    action: p.action,
    description: p.description,
  };
}

export function mapRoleWithPermissions(role: DbUser['role']): RoleWithPermissions {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    isSystem: role.isSystem,
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
    permissions: role.permissions.map((rp) => mapPermission(rp.permission)),
  };
}

export function mapUser(user: DbUser): UserWithRole {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    roleId: user.roleId,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: mapRoleWithPermissions(user.role),
  };
}

export function mapSimpleUser(user: Omit<DbUser, 'role'>): User {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    roleId: user.roleId,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export const userInclude = {
  role: {
    include: {
      permissions: { include: { permission: true } },
    },
  },
} as const;

export type { PrismaClient };
