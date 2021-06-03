import { Task } from '../../../domain/task/task';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { ITaskRepository } from '../../../domain/task/repositoryInterface/ITaskRepository';

export class InMemoryTaskRepository implements ITaskRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public create(task: Task): Promise<Task | Error> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(taskId: UniqueEntityID): Promise<number | Error> {
    return Promise.resolve(undefined);
  }

  public findAll(): Promise<Task[]> {
    return Promise.resolve([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public findOne(taskId: UniqueEntityID): Promise<Task | Error> {
    return Promise.resolve(undefined);
  }

  public nextTaskNo(): Promise<number> {
    return Promise.resolve(0);
  }

  public reAssignTaskNo(): Promise<void | Error> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(task: Task): Promise<Task | Error> {
    return Promise.resolve(undefined);
  }
}
