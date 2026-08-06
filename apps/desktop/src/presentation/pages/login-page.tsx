import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Zap, Sun, Moon, Globe } from 'lucide-react';
import { Button, Input, Checkbox, cn } from '@elektra/ui';
import { loginSchema, type LoginFormData } from '@/presentation/schemas/login.schema';
import { useLogin } from '@/presentation/hooks/use-login';
import { useLanguageSwitch } from '@/presentation/hooks/use-language';
import { useAppStore, useAuthStore } from '@/presentation/stores';
import { useState } from 'react';

export function LoginPage() {
  const { t } = useTranslation();
  const { login } = useLogin();
  const { language, switchLanguage } = useLanguageSwitch();
  const { theme, toggleTheme } = useAppStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', rememberMe: false },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    const result = await login(data);
    if (!result.success) {
      setError(result.error);
    }
  };

  const toggleLang = () => {
    void switchLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 bg-gradient-to-br from-primary to-primary/70 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{t('common.appName')}</h1>
          </div>
          <p className="max-w-md text-lg text-white/80">
            Enterprise-grade point of sale system for modern retail businesses.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center p-8">
        <div className="absolute end-6 top-6 flex gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLang}>
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center lg:text-start">
            <div className="mb-4 flex items-center justify-center gap-2 lg:hidden">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">{t('common.appName')}</span>
            </div>
            <h2 className="text-2xl font-bold">{t('auth.loginTitle')}</h2>
            <p className="mt-1 text-muted-foreground">{t('auth.loginSubtitle')}</p>
          </div>

          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-4">
            <Input
              label={t('auth.username')}
              {...register('username')}
              error={errors.username ? t('auth.username') : undefined}
              autoComplete="username"
            />
            <Input
              label={t('auth.password')}
              type="password"
              {...register('password')}
              error={errors.password ? t('auth.password') : undefined}
              autoComplete="current-password"
            />
            <Checkbox label={t('auth.rememberMe')} {...register('rememberMe')} />

            {error && (
              <p className={cn('rounded-md bg-destructive/10 p-3 text-sm text-destructive')}>
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
              {t('auth.login')}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
