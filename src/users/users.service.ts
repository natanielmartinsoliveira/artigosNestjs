import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

   async create(data: { name: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = this.usersRepo.create({
      name: data.name,
      email: data.email,
      password: hashed,
    });
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    Object.assign(user, data);
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepo.remove(user);
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }
}
