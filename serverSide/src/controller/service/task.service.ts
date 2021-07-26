import { Injectable } from '@nestjs/common';
import { prismaClient } from '../../util/prisma/prismaClient';
import { Converter, IConverter } from '../../infra/db/repository/shared/converter';
import { PrismaClient } from '@prisma/client';
import { TaskRepository } from '../../infra/db/repository/taskRepository';
import { TaskFactory } from '../../domain/task/taskFactory';
import { CreateTaskUsecase } from '../../usecase/task/createTaskUsecase';
import { ITask } from '../taskController';
import { FindAllTaskUsecase } from '../../usecase/task/findAllTaskUsecase';
import { TaskDTO } from '../../usecase/task/DTO/taskDTO';
import { FindOneTaskUsecase } from '../../usecase/task/findOneTaskUsecase';
import { DeleteTaskUsecase } from '../../usecase/task/deleteTaskUsecase';
import { ParticipantRepository } from '../../infra/db/repository/participantRepository';
import { UpdateTaskUsecase, UpdateTaskUsecaseProps } from '../../usecase/task/updateTaskUsecase';

@Injectable()
export class TaskService {
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

  public async findAll(): Promise<TaskDTO[]> {
    return await this.findAllTaskUsecase.do();
  }

  public async findOne(id: string): Promise<TaskDTO> {
    return await this.findOneTaskUsecase.do({ id: id });
  }

  public async create(task: ITask): Promise<TaskDTO> {
    return await this.createTaskUsecase.do(task);
  }

  public async update(data: UpdateTaskUsecaseProps): Promise<TaskDTO> {
    return await this.updateTaskUsecase.do(data);
  }

  public async delete(id: string): Promise<void> {
    return await this.deleteTaskUsecase.do({ id: id });
  }
}
