import { describe, it, expect } from 'vitest';
import { ok, err } from '@elektra/shared';

describe('Result helpers', () => {
  it('ok returns success result', () => {
    const result = ok({ id: '1', name: 'test' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('test');
    }
  });

  it('err returns failure result', () => {
    const result = err('something went wrong');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('something went wrong');
    }
  });
});

describe('DI Container', () => {
  it('registers and resolves dependencies', async () => {
    const { createToken, register, resolve, clearContainer } = await import('@elektra/shared');

    clearContainer();
    const token = createToken<string>('TestToken');
    register(token, () => 'hello');

    expect(resolve(token)).toBe('hello');
    clearContainer();
  });

  it('throws when token is not registered', async () => {
    const { createToken, resolve, clearContainer } = await import('@elektra/shared');

    clearContainer();
    const token = createToken<string>('MissingToken');

    expect(() => resolve(token)).toThrow('DI: No registration');
  });
});
