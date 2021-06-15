/* eslint-disable */

import { Task } from '../../../domain/task/task';
import { ITaskRepository } from '../../../domain/task/repositoryInterface/ITaskRepository';
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';

export class InMemoryTaskRepository implements ITaskRepository {

  public create(task: Task): Promise<Task> {
    return Promise.resolve(undefined);
  }

  public delete(task: Task): Promise<number> {
    return Promise.resolve(undefined);
  }

  public findAll(): Promise<Task[]> {
    return Promise.resolve([]);
  }

  public findOne(taskId: string): Promise<Task> {
    return Promise.resolve(undefined);
  }

  public nextTaskNo(): Promise<number> {
    return Promise.resolve(0);
  }

  public reAssignTaskNo(): Promise<void> {
    return Promise.resolve(undefined);
  }

  public update(task: Task): Promise<Task> {
    return Promise.resolve(undefined);
  }

  public findByTaskGroup(taskGroup: TaskGroup): Promise<Task[]> {
    return Promise.resolve([]);
  }
}
