import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskDTO } from '../usecase/task/DTO/taskDTO';
import { UpdateTaskUsecase, UpdateTaskUsecaseProps } from '../usecase/task/updateTaskUsecase';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../util/prisma/prismaClient';
import { TaskRepository } from '../infra/db/repository/taskRepository';
import { ParticipantRepository } from '../infra/db/repository/participantRepository';
import { TaskFactory } from '../domain/task/taskFactory';
import { CreateTaskUsecase } from '../usecase/task/createTaskUsecase';
import { FindAllTaskUsecase } from '../usecase/task/findAllTaskUsecase';
import { FindOneTaskUsecase } from '../usecase/task/findOneTaskUsecase';
import { DeleteTaskUsecase } from '../usecase/task/deleteTaskUsecase';
import { ToTaskConverter } from '../infra/db/repository/shared/converter/ToTaskConverter';
import { ToHavingTaskCollectionConverter } from '@/infra/db/repository/shared/converter/ToHavingTaskCollectionConverter';
import { ToParticipantConverter } from '../infra/db/repository/shared/converter/ToParticipantConverter';

export interface ITask {
  name: string;
  description: string;
  group: string;
}

@Controller('task')
export class TaskController {
  private prisma: PrismaClient = prismaClient;

  private toTaskConverter = new ToTaskConverter();
  private toHavingTaskCollectionConverter = new ToHavingTaskCollectionConverter(
    this.toTaskConverter,
  );
  private toParticipantConverter = new ToParticipantConverter(
    this.toTaskConverter,
    this.toHavingTaskCollectionConverter,
  );
  private participantRepository = new ParticipantRepository(
    this.prisma,
    this.toTaskConverter,
    this.toParticipantConverter,
    this.toHavingTaskCollectionConverter,
  );
  private taskRepository = new TaskRepository(prismaClient, this.toTaskConverter);
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
