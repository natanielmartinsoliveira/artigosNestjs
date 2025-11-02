import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, InjectDataSource } from '@nestjs/typeorm';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';
import { DataSource } from 'typeorm';
import { seedPermissionsAndRoot } from './seeds/permissions.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule implements OnModuleInit {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async onModuleInit() {
    await seedPermissionsAndRoot(this.dataSource);
  }
}
