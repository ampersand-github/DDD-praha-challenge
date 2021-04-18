import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Practice, PrismaClient } from '@prisma/client';
import { getAllUsecase } from 'src/usecase/practice/getAllUseCase';
import { getAllRepository } from '../repository/getAllRepository';
import { PracticeDataDTO } from '../usecase/practice/practiceDataDTO';
import { getOneRepository } from '../repository/getOneRepository';
import { getOneUsecase } from '../usecase/practice/getOneUseCase';
import { insertRepository } from '../repository/InsertRepository';
import { insertUseCase } from '../usecase/practice/insertUseCase';
import { deleteRepository } from '../repository/deleteRepository';
import { deleteUseCase } from '../usecase/practice/deleteUseCase';
import { updateRepository } from '../repository/updateRepository';
import { updateUseCase } from '../usecase/practice/updateUseCase';

@Controller('practice')
export class PracticeController {
  // curl -X GET http://localhost:3000/practice
  @Get()
  async getAll(): Promise<PracticeDataDTO[]> {
    const prisma = new PrismaClient();
    const repo = new getAllRepository(prisma);
    const usecase = new getAllUsecase(repo);
    return await usecase.do();
    // todo 疑問 これであっているのか？
  }

  // curl -X GET http://localhost:3000/practice/3
  @Get('/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PracticeDataDTO[]> {
    const prisma = new PrismaClient();
    const repo = new getOneRepository(prisma);
    const usecase = new getOneUsecase(repo);
    return await usecase.do(id);
  }

  // curl -X POST http://localhost:3000/practice -d 'title=TEST'
  @Post()
  async insert(@Body('title') title: string): Promise<Practice> {
    const prisma = new PrismaClient();
    const repo = new insertRepository(prisma);
    const usecase = new insertUseCase(repo);
    return await usecase.do(title);
  }

  // curl -X DELETE http://localhost:3000/practice/1
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Practice> {
    const prisma = new PrismaClient();
    const repo = new deleteRepository(prisma);
    const usecase = new deleteUseCase(repo);
    return await usecase.do(id);
  }

  // curl -X PATCH http://localhost:3000/practice/6 -d 'text=updated'
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('text') text: string,
  ): Promise<Practice> {
    const prisma = new PrismaClient();
    const repo = new updateRepository(prisma);
    const usecase = new updateUseCase(repo);
    return await usecase.do(id, text);
  }
}
