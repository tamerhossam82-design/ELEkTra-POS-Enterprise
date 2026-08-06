export interface User {
  id: string;
  username: string;
  email: string | null;
  fullName: string;
  roleId: string;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  module: string;
  action: string;
  description: string | null;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  category: string;
  description: string | null;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  metadata: string | null;
  ipAddress: string | null;
  createdAt: Date;
}

export interface RoleWithPermissions extends Role {
  permissions: Permission[];
}

export interface UserWithRole extends User {
  role: RoleWithPermissions;
}
