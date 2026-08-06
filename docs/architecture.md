# Architecture

## Overview

ELEkTra POS Enterprise follows Clean Architecture with four distinct layers:

```
┌─────────────────────────────────────────────┐
│              Presentation Layer              │
│  React Components, Hooks, Zustand Stores    │
├─────────────────────────────────────────────┤
│              Application Layer               │
│         Use Cases (Login, Dashboard)          │
├─────────────────────────────────────────────┤
│               Domain Layer                   │
│   Entities, Interfaces, DI Container        │
├─────────────────────────────────────────────┤
│            Infrastructure Layer              │
│  Prisma Repos, Electron IPC, SQLite          │
└─────────────────────────────────────────────┘
```

## Dependency Rule

Dependencies point inward. Outer layers depend on inner layers, never the reverse.

- Presentation → Application → Domain ← Infrastructure

## Repository Pattern

All data access goes through repository interfaces defined in `packages/shared`:

```typescript
interface IAuthRepository {
  authenticate(credentials: LoginCredentials): Promise<AuthSession | null>;
  findById(id: string): Promise<UserWithRole | null>;
  updateLastLogin(userId: string): Promise<void>;
}
```

Implementations live in `packages/database` using Prisma.

## Dependency Injection

A lightweight DI container in `packages/shared/src/di/container.ts` registers and resolves dependencies by token. The desktop app wires implementations at startup.

## Electron IPC

Database operations run in the Electron main process (Node.js). The renderer communicates via IPC channels exposed through the preload script:

- `auth:login` — Authenticate user
- `dashboard:metrics` — Fetch dashboard KPIs
- `dashboard:topProducts` — Top selling products
- `dashboard:recentActivity` — Recent audit log entries

## Database Schema

| Model | Purpose |
|-------|---------|
| User | System users with credentials |
| Role | User roles (Administrator, Cashier, etc.) |
| Permission | Granular access permissions |
| RolePermission | Many-to-many role-permission mapping |
| Setting | Application configuration key-value pairs |
| AuditLog | Activity tracking and audit trail |

## Localization

i18next with two locales:

- **English (en)** — LTR layout
- **Arabic (ar)** — RTL layout

Language switching updates `document.documentElement.dir` and `lang` attributes without page reload.

## File Size Limit

All source files are kept under 250 lines to maintain readability and single-responsibility.
