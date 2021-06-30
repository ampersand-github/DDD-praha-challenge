/* eslint-disable */

import { TaskGroup } from '../../../domain/taskGroup/taskGroup';
import { ITaskGroupRepository } from '../../../domain/taskGroup/ITaskGroupRepository';

export class TaskGroupRepository implements ITaskGroupRepository {
  public async findAll(): Promise<TaskGroup[]> {
    return Promise.resolve([]);
  }

  public async create(taskGroup: TaskGroup): Promise<TaskGroup> {
    return Promise.resolve(undefined);
  }

  public async delete(taskGroup: TaskGroup): Promise<number> {
    return Promise.resolve(undefined);
  }

  public async update(taskGroup: TaskGroup): Promise<TaskGroup> {
    return Promise.resolve(undefined);
  }

  public async findOne(taskGroup: string): Promise<TaskGroup> {
    return Promise.resolve(undefined);
  }
}
