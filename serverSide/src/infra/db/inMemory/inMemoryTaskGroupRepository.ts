import { PrismaClient } from '@prisma/client';
import { ITaskGroupRepository } from '../../../Interface/repository/ITaskGroupRepository';
import { TaskGroup } from '../../../domain/task/taskGroup';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

export class InMemoryTaskGroupRepository implements ITaskGroupRepository {
  private prismaClient: PrismaClient = new PrismaClient();

  public findAll(): Promise<TaskGroup[]> {
    return Promise.resolve([]);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public create(taskGroup: TaskGroup): Promise<TaskGroup | Error> {
    return Promise.resolve(undefined);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(taskGroup: TaskGroup): Promise<TaskGroup | Error> {
    return Promise.resolve(undefined);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(id: UniqueEntityID): Promise<number | Error> {
    return Promise.resolve(undefined);
  }
}
