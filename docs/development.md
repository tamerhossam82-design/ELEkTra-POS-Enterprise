# Development Setup

## First-Time Setup

1. Clone the repository
2. Run `npm install` from the monorepo root
3. Generate Prisma client: `npm run db:generate`
4. Run migrations: `cd packages/database && npx prisma migrate dev --name init`
5. Seed data: `npm run db:seed`
6. Start dev: `npm run dev`

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `DATABASE_URL` | `packages/database/.env` | SQLite connection for dev/migrations |

In production (Electron), the database is stored at `%APPDATA%/elektra-pos-enterprise/elektra.db`.

## Git Hooks

Husky runs lint-staged on pre-commit:
- ESLint fix on TypeScript files
- Prettier format on all supported files

Initialize hooks after install:
```bash
npx husky
```
