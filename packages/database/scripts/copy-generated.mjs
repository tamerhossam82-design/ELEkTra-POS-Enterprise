import { cpSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, '..');

const source = resolve(packageRoot, 'src/generated');
const destination = resolve(packageRoot, 'dist/generated');

mkdirSync(destination, { recursive: true });
cpSync(source, destination, { recursive: true });

console.log('Prisma generated client copied to dist/generated');