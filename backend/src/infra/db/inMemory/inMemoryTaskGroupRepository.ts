/* eslint-disable */

import { PrismaClient } from '@prisma/client';
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';
import { ITaskGroupRepository } from '../../../domain/taskGroup/repositoryInterface/ITaskGroupRepository';

export class InMemoryTaskGroupRepository implements ITaskGroupRepository {
  public findAll(): Promise<TaskGroup[]> {
    return Promise.resolve([]);
  }
  public create(taskGroup: TaskGroup): Promise<TaskGroup> {
    return Promise.resolve(undefined);
  }
  public update(taskGroup: TaskGroup): Promise<TaskGroup> {
    return Promise.resolve(undefined);
  }
  public delete(taskGroup: TaskGroup): Promise<number> {
    return Promise.resolve(undefined);
  }
  public findOne(taskGroup: string): Promise<TaskGroup> {
    return Promise.resolve(undefined);
  }
}
