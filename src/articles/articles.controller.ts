import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('articles')

export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Editor')
  @Post()
  create(@Body() body: any, @Request() req: any) {
    return this.articlesService.create(body, req.user);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Editor')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any, @Request() req: any) {
    return this.articlesService.update(id, body, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Editor')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.articlesService.remove(id, req.user);
  }
}