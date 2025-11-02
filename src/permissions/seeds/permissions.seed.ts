import { DataSource } from 'typeorm';
import { Permission } from '../permission.entity';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedPermissionsAndRoot(dataSource: DataSource) {
  const permissionRepo = dataSource.getRepository(Permission);
  const userRepo = dataSource.getRepository(User);

  const permissions = [
    { name: 'Admin', description: 'Gerencia artigos e usuários' },
    { name: 'Editor', description: 'Gerencia apenas artigos' },
    { name: 'Reader', description: 'Pode apenas ler artigos' },
  ];

  for (const p of permissions) {
    const exists = await permissionRepo.findOne({ where: { name: p.name } });
    if (!exists) {
      await permissionRepo.save(permissionRepo.create(p));
    }
  }

  const adminPermission = await permissionRepo.findOne({ where: { name: 'Admin' } });

  const rootExists = await userRepo.findOne({ where: { email: 'root@admin.com' } });
  if (!rootExists) {
    const hashed = await bcrypt.hash('root123', 10);
    const rootUser = userRepo.create({
      name: 'Root Admin',
      email: 'root@admin.com',
      password: hashed,
      permission: adminPermission,
    });
    await userRepo.save(rootUser);
    console.log('Usuário root criado: root@admin.com / root123');
  }
}
