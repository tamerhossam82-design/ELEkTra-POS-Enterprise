import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getLoginUseCase } from '@/infrastructure/di/container';
import { useAuthStore } from '@/presentation/stores';
import type { LoginFormData } from '@/presentation/schemas/login.schema';

export function useLogin() {
  const { t } = useTranslation();
  const setSession = useAuthStore((s) => s.setSession);

  const login = useCallback(
    async (data: LoginFormData) => {
      const useCase = getLoginUseCase();
      const result = await useCase.execute({
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (!result.success) {
        return { success: false as const, error: t('auth.invalidCredentials') };
      }

      setSession(result.data);
      return { success: true as const };
    },
    [setSession, t],
  );

  return { login };
}
