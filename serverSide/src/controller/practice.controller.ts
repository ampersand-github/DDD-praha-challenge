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
import { Practice } from '@prisma/client';
import { getAllUsecase } from 'src/usecase/practice/getAllUseCase';
import { PracticeDataDTO } from '../usecase/practice/dto/practiceDataDTO';
import { getOneUsecase } from '../usecase/practice/getOneUseCase';
import { insertUseCase } from '../usecase/practice/insertUseCase';
import { deleteUseCase } from '../usecase/practice/deleteUseCase';
import { updateUseCase } from '../usecase/practice/updateUseCase';
import { PracticeRepository } from '../infra/db/repository/PracticeRepository';

@Controller('practice')
export class PracticeController {
  // curl -X GET http://localhost:3000/practice
  @Get()
  async getAll(): Promise<PracticeDataDTO[]> {
    const repo = new PracticeRepository();
    const usecase = new getAllUsecase(repo);
    return await usecase.do();
  }

  // curl -X GET http://localhost:3000/practice/3
  @Get('/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PracticeDataDTO[]> {
    const repo = new PracticeRepository();
    const usecase = new getOneUsecase(repo);
    return await usecase.do(id);
  }

  // curl -X POST http://localhost:3000/practice -d 'text=TEST'
  @Post()
  async insert(@Body('text') text: string): Promise<Practice> {
    const repo = new PracticeRepository();
    const usecase = new insertUseCase(repo);
    return await usecase.do(text);
  }

  // curl -X DELETE http://localhost:3000/practice/1
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Practice> {
    const repo = new PracticeRepository();
    const usecase = new deleteUseCase(repo);
    return await usecase.do(id);
  }

  // curl -X PATCH http://localhost:3000/practice/6 -d 'text=updated'
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('text') text: string,
  ): Promise<Practice> {
    const repo = new PracticeRepository();
    const usecase = new updateUseCase(repo);
    return await usecase.do(id, text);
  }
}
