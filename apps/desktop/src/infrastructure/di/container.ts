import type { LoginCredentials, AuthSession, Result } from '@elektra/shared';
import type { ILoginUseCase, IDashboardUseCase } from '@elektra/shared';
import type {
  IDashboardMetrics,
  ITopProduct,
  IRecentActivity,
} from '@elektra/shared';

function getAPI() {
  if (!window.elektra) {
    throw new Error('Electron API not available');
  }
  return window.elektra;
}

export class IpcLoginUseCase implements ILoginUseCase {
  async execute(credentials: LoginCredentials): Promise<Result<AuthSession, string>> {
    return getAPI().auth.login(credentials);
  }
}

export class IpcDashboardUseCase implements IDashboardUseCase {
  async getMetrics(): Promise<IDashboardMetrics> {
    return getAPI().dashboard.getMetrics();
  }

  async getTopProducts(limit: number): Promise<ITopProduct[]> {
    return getAPI().dashboard.getTopProducts(limit);
  }

  async getRecentActivity(limit: number): Promise<IRecentActivity[]> {
    const activities = await getAPI().dashboard.getRecentActivity(limit);
    return activities.map((a) => ({
      ...a,
      createdAt: new Date(a.createdAt),
    }));
  }
}

export function getLoginUseCase(): ILoginUseCase {
  return new IpcLoginUseCase();
}

export function getDashboardUseCase(): IDashboardUseCase {
  return new IpcDashboardUseCase();
}
