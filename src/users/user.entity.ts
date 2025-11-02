import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn  } from 'typeorm';
import { Article } from 'src/articles/article.entity';
import { Permission } from 'src/permissions/permission.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @ManyToOne(() => Permission, (permission) => permission.users, { nullable: true, eager: true })
  @JoinColumn({ name: 'permission_id' })
  permission?: Permission | null;
}
