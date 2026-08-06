import { contextBridge, ipcRenderer } from 'electron';
import type { LoginCredentials, Result, AuthSession } from '@elektra/shared';

const api = {
  platform: process.platform,
  auth: {
    login: (credentials: LoginCredentials) =>
      ipcRenderer.invoke('auth:login', credentials) as Promise<Result<AuthSession, string>>,
  },
  dashboard: {
    getMetrics: () =>
      ipcRenderer.invoke('dashboard:metrics') as Promise<{
        todaySales: number;
        todayProfit: number;
        inventoryValue: number;
        customerCredit: number;
        cashDrawer: number;
      }>,
    getTopProducts: (limit: number) =>
      ipcRenderer.invoke('dashboard:topProducts', limit) as Promise<
        Array<{ id: string; name: string; quantitySold: number; revenue: number }>
      >,
    getRecentActivity: (limit: number) =>
      ipcRenderer.invoke('dashboard:recentActivity', limit) as Promise<
        Array<{
          id: string;
          action: string;
          entity: string;
          userName: string | null;
          createdAt: string;
        }>
      >,
  },
};

contextBridge.exposeInMainWorld('elektra', api);

export type ElektraAPI = typeof api;
