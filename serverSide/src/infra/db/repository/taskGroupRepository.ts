import { TaskGroup } from '../../../domain/taskGroup/taskGroup';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { ITaskGroupRepository } from '../../../domain/taskGroup/ITaskGroupRepository';

export class TaskGroupRepository implements ITaskGroupRepository {
  public async findAll(): Promise<TaskGroup[]> {
    return Promise.resolve([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async create(taskGroup: TaskGroup): Promise<TaskGroup | Error> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async delete(id: UniqueEntityID): Promise<number | Error> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async update(taskGroup: TaskGroup): Promise<TaskGroup | Error> {
    return Promise.resolve(undefined);
  }
}
