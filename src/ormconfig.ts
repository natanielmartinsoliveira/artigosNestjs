import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Article } from './articles/article.entity';
import { Permission } from './permissions/permission.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'nestjs_articles',
  entities: [User, Article, Permission],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
