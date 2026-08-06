import bcrypt from 'bcryptjs';
import { getPrismaClient } from '../src/client.js';

const prisma = getPrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'Administrator' },
    create: {
      name: 'Administrator',
      description: 'Full system access',
      isSystem: true,
    },
    update: {},
  });

  const permissions = [
    { name: 'users.read', module: 'users', action: 'read', description: 'View users' },
    { name: 'users.write', module: 'users', action: 'write', description: 'Manage users' },
    { name: 'pos.sell', module: 'pos', action: 'sell', description: 'Process sales' },
    { name: 'reports.view', module: 'reports', action: 'view', description: 'View reports' },
    { name: 'settings.manage', module: 'settings', action: 'manage', description: 'Manage settings' },
  ];

  for (const perm of permissions) {
    const permission = await prisma.permission.upsert({
      where: { name: perm.name },
      create: perm,
      update: {},
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: { roleId: adminRole.id, permissionId: permission.id },
      },
      create: { roleId: adminRole.id, permissionId: permission.id },
      update: {},
    });
  }

  const passwordHash = await bcrypt.hash('admin123', 12);

  await prisma.user.upsert({
    where: { username: 'admin' },
    create: {
      username: 'admin',
      email: 'admin@elektra.local',
      passwordHash,
      fullName: 'System Administrator',
      roleId: adminRole.id,
    },
    update: {},
  });

  const defaultSettings = [
    { key: 'app.name', value: 'ELEkTra POS Enterprise', category: 'general' },
    { key: 'app.language', value: 'en', category: 'general' },
    { key: 'app.theme', value: 'light', category: 'general' },
    { key: 'pos.currency', value: 'SAR', category: 'pos' },
    { key: 'pos.tax_rate', value: '15', category: 'pos' },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      create: setting,
      update: {},
    });
  }

  console.log('Seed completed: admin / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
