type Factory<T> = () => T;
type Token<T> = symbol & { __type?: T };

const registry = new Map<symbol, Factory<unknown>>();

export function createToken<T>(name: string): Token<T> {
  return Symbol(name) as Token<T>;
}

export function register<T>(token: Token<T>, factory: Factory<T>): void {
  registry.set(token, factory as Factory<unknown>);
}

export function resolve<T>(token: Token<T>): T {
  const factory = registry.get(token);
  if (!factory) {
    throw new Error(`DI: No registration for token ${String(token)}`);
  }
  return factory() as T;
}

export function has(token: Token<unknown>): boolean {
  return registry.has(token);
}

export function clearContainer(): void {
  registry.clear();
}

export const Tokens = {
  AuthRepository: createToken<import('../repositories/index.js').IAuthRepository>(
    'AuthRepository',
  ),
  UserRepository: createToken<import('../repositories/index.js').IUserRepository>(
    'UserRepository',
  ),
  SettingsRepository: createToken<import('../repositories/index.js').ISettingsRepository>(
    'SettingsRepository',
  ),
  AuditLogRepository: createToken<import('../repositories/index.js').IAuditLogRepository>(
    'AuditLogRepository',
  ),
  LoginUseCase: createToken<import('../use-cases/index.js').ILoginUseCase>('LoginUseCase'),
  DashboardUseCase: createToken<import('../use-cases/index.js').IDashboardUseCase>(
    'DashboardUseCase',
  ),
} as const;
