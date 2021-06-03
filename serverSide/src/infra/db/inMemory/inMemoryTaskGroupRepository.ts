import { PrismaClient } from '@prisma/client';

import { TaskGroup } from '../../../domain/taskGroup/taskGroup';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { ITaskGroupRepository } from '../../../domain/taskGroup/ITaskGroupRepository';

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
