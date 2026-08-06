import { ipcMain } from 'electron';
import { join } from 'node:path';
import { app } from 'electron';
import {
  getPrismaClient,
  AuthRepository,
  AuditLogRepository,
} from '@elektra/database';
import { LoginUseCase, DashboardUseCase } from '../src/application/use-cases/index.js';
import type { LoginCredentials } from '@elektra/shared';

function getDatabasePath(): string {
  const userData = app.getPath('userData');
  return `file:${join(userData, 'elektra.db')}`;
}

let loginUseCase: LoginUseCase | null = null;
let dashboardUseCase: DashboardUseCase | null = null;

function getLoginUseCase(): LoginUseCase {
  if (!loginUseCase) {
    const db = getPrismaClient(getDatabasePath());
    loginUseCase = new LoginUseCase(new AuthRepository(db), new AuditLogRepository(db));
  }
  return loginUseCase;
}

function getDashboardUseCase(): DashboardUseCase {
  if (!dashboardUseCase) {
    const db = getPrismaClient(getDatabasePath());
    dashboardUseCase = new DashboardUseCase(new AuditLogRepository(db));
  }
  return dashboardUseCase;
}

export function registerIpcHandlers(): void {
  ipcMain.handle('auth:login', async (_event, credentials: LoginCredentials) => {
    return getLoginUseCase().execute(credentials);
  });

  ipcMain.handle('dashboard:metrics', async () => {
    return getDashboardUseCase().getMetrics();
  });

  ipcMain.handle('dashboard:topProducts', async (_event, limit: number) => {
    return getDashboardUseCase().getTopProducts(limit);
  });

  ipcMain.handle('dashboard:recentActivity', async (_event, limit: number) => {
    return getDashboardUseCase().getRecentActivity(limit);
  });
}
