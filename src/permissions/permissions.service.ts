import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepo: Repository<Permission>,
  ) {}

  async findAll() {
    return this.permissionsRepo.find();
  }

  async findByName(name: string) {
    return this.permissionsRepo.findOne({ where: { name } });
  }

  async createDefaultPermissions() {
    const defaults = [
      { name: 'Admin', description: 'Gerencia artigos e usuários' },
      { name: 'Editor', description: 'Gerencia apenas artigos' },
    ];

    for (const perm of defaults) {
      const exists = await this.permissionsRepo.findOne({ where: { name: perm.name } });
      if (!exists) {
        await this.permissionsRepo.save(this.permissionsRepo.create(perm));
      }
    }
  }
}
