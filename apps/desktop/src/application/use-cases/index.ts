import type {
  ILoginUseCase,
  IDashboardUseCase,
  LoginCredentials,
  Result,
  AuthSession,
  IDashboardMetrics,
  ITopProduct,
  IRecentActivity,
} from '@elektra/shared';
import { ok, err } from '@elektra/shared';
import type { IAuthRepository, IAuditLogRepository } from '@elektra/shared';

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly authRepo: IAuthRepository,
    private readonly auditRepo: IAuditLogRepository,
  ) {}

  async execute(credentials: LoginCredentials): Promise<Result<AuthSession, string>> {
    if (!credentials.username.trim() || !credentials.password) {
      return err('auth.invalidCredentials');
    }

    const session = await this.authRepo.authenticate(credentials);
    if (!session) {
      return err('auth.invalidCredentials');
    }

    await this.authRepo.updateLastLogin(session.user.id);
    await this.auditRepo.create({
      userId: session.user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: session.user.id,
    });

    return ok(session);
  }
}

export class DashboardUseCase implements IDashboardUseCase {
  constructor(private readonly auditRepo: IAuditLogRepository) {}

  async getMetrics(): Promise<IDashboardMetrics> {
    return {
      todaySales: 12450.75,
      todayProfit: 3420.5,
      inventoryValue: 89500.0,
      customerCredit: 5680.25,
      cashDrawer: 3200.0,
    };
  }

  async getTopProducts(limit: number): Promise<ITopProduct[]> {
    const products: ITopProduct[] = [
      { id: '1', name: 'Premium Coffee Beans', quantitySold: 48, revenue: 1440 },
      { id: '2', name: 'Organic Green Tea', quantitySold: 36, revenue: 1080 },
      { id: '3', name: 'Dark Chocolate Bar', quantitySold: 52, revenue: 780 },
      { id: '4', name: 'Mineral Water 500ml', quantitySold: 120, revenue: 600 },
      { id: '5', name: 'Fresh Croissant', quantitySold: 65, revenue: 455 },
    ];
    return products.slice(0, limit);
  }

  async getRecentActivity(limit: number): Promise<IRecentActivity[]> {
    return this.auditRepo.findRecent(limit);
  }
}
