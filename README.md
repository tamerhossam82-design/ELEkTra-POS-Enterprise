# ELEkTra POS Enterprise

Production-ready offline Windows desktop Point of Sale application.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop | Electron 34 |
| UI | React 19, TailwindCSS, Framer Motion |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Database | Prisma ORM + SQLite |
| i18n | i18next (English LTR, Arabic RTL) |
| Monorepo | Turborepo |
| Architecture | Clean Architecture, Repository Pattern, DI |

## Project Structure

```
apps/
  desktop/          Electron + React application
packages/
  shared/           Domain entities, interfaces, DI container
  database/         Prisma schema, repository implementations
  localization/     i18next translations (en, ar)
  ui/               Shared UI component library
  printer/          Receipt printing service (stub)
  backup/           Database backup service (stub)
docs/               Documentation
tests/              Test suites
.github/            CI/CD workflows
```

## Prerequisites

- Node.js >= 20
- npm >= 10
- Windows 10/11

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed default data (admin / admin123)
npm run db:seed

# Start development
npm run dev
```

## Default Credentials

| Username | Password |
|----------|----------|
| admin    | admin123 |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Electron dev server |
| `npm run build` | Build all packages and desktop app |
| `npm run lint` | Run ESLint across monorepo |
| `npm run typecheck` | TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run test suites |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed default data |

## Architecture

The application follows Clean Architecture principles:

- **Domain** (`packages/shared`): Entities, repository interfaces, use case interfaces
- **Application** (`apps/desktop/src/application`): Use case implementations
- **Infrastructure** (`packages/database`, `electron/`): Prisma repositories, IPC handlers
- **Presentation** (`apps/desktop/src/presentation`): React components, hooks, stores

Business logic lives in use cases — never in React components. Dependency Injection wires repositories to use cases via a lightweight container.

## License

Proprietary — ELEkTra POS Enterprise
