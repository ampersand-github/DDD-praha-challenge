import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskDTO } from '../usecase/task/DTO/taskDTO';
import { UpdateTaskUsecase, UpdateTaskUsecaseProps } from '../usecase/task/updateTaskUsecase';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../util/prisma/prismaClient';
import { Converter, IConverter } from '../infra/db/repository/shared/converter';
import { TaskRepository } from '../infra/db/repository/taskRepository';
import { ParticipantRepository } from '../infra/db/repository/participantRepository';
import { TaskFactory } from '../domain/task/taskFactory';
import { CreateTaskUsecase } from '../usecase/task/createTaskUsecase';
import { FindAllTaskUsecase } from '../usecase/task/findAllTaskUsecase';
import { FindOneTaskUsecase } from '../usecase/task/findOneTaskUsecase';
import { DeleteTaskUsecase } from '../usecase/task/deleteTaskUsecase';

export interface ITask {
  name: string;
  description: string;
  group: string;
}

@Controller('task')
export class TaskController {
  private prisma: PrismaClient = prismaClient;
  private converter: IConverter = new Converter();
  private taskRepository = new TaskRepository(this.prisma, this.converter);
  private participantRepository = new ParticipantRepository(this.prisma, this.converter);
  private taskFactory = new TaskFactory(this.taskRepository);
  private createTaskUsecase = new CreateTaskUsecase(this.taskRepository, this.taskFactory);
  private findAllTaskUsecase = new FindAllTaskUsecase(this.taskRepository);
  private findOneTaskUsecase = new FindOneTaskUsecase(this.taskRepository);
  private deleteTaskUsecase = new DeleteTaskUsecase(
    this.taskRepository,
    this.participantRepository,
  );
  private updateTaskUsecase = new UpdateTaskUsecase(this.taskRepository);

  @Get()
  public async findAll(): Promise<TaskDTO[]> {
    return await this.findAllTaskUsecase.do();
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<TaskDTO> {
    return await this.findOneTaskUsecase.do({ id: id });
  }
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    return await this.deleteTaskUsecase.do({ id: id });
  }

  @Post()
  public async create(@Body() data: ITask) {
    return await this.createTaskUsecase.do(data);
  }

  @Patch('/:id')
  public async update(
    @Param('id') taskId: string,
    @Body('updateName') updateName: string,
    @Body('updateDescription') updateDescription: string,
    @Body('updateGroup') updateGroup: string,
  ) {
    const data: UpdateTaskUsecaseProps = {
      taskId: taskId,
      updateName: updateName,
      updateDescription: updateDescription,
      updateGroup: updateGroup,
    };
    return await this.updateTaskUsecase.do(data);
  }
}
