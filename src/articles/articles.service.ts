import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepo: Repository<Article>,
  ) {}

  async create(data: { title: string; content: string }, author: User) {
    const article = this.articlesRepo.create({
      title: data.title,
      content: data.content,
      author,
    });
    return this.articlesRepo.save(article);
  }

  findAll() {
    return this.articlesRepo.find({ relations: ['author'] });
  }

  async findOne(id: number) {
    const article = await this.articlesRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!article) throw new NotFoundException('Artigo não encontrado');
    return article;
  }

  async update(id: number, data: Partial<Article>, user: User) {
    const article = await this.findOne(id);
    if (article.author.id !== user.id)
      throw new NotFoundException('Você não é o autor deste artigo');

    Object.assign(article, data);
    return this.articlesRepo.save(article);
  }

  async remove(id: number, user: User) {
    const article = await this.findOne(id);
    if (article.author.id !== user.id)
      throw new NotFoundException('Você não é o autor deste artigo');

    return this.articlesRepo.remove(article);
  }
}