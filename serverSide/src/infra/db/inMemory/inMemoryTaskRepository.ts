import { Task } from '../../../domain/task/task';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { ITaskRepository } from '../../../domain/task/repositoryInterface/ITaskRepository';
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';

export class InMemoryTaskRepository implements ITaskRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public create(task: Task): Promise<Task> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(task: Task): Promise<number> {
    return Promise.resolve(undefined);
  }

  public findAll(): Promise<Task[]> {
    return Promise.resolve([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public findOne(taskId: string): Promise<Task> {
    return Promise.resolve(undefined);
  }

  public nextTaskNo(): Promise<number> {
    return Promise.resolve(0);
  }

  public reAssignTaskNo(): Promise<void> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(task: Task): Promise<Task> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public findByTaskGroup(taskGroup: TaskGroup): Promise<Task[]> {
    return Promise.resolve([]);
  }
}
