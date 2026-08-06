import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'auth.username'),
  password: z.string().min(1, 'auth.password'),
  rememberMe: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
