import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';
import { TaskGroup } from '../../domain/task/taskGroup';

export interface ITaskGroupRepository {
  findAll(): Promise<TaskGroup[]>;
  create(taskGroup: TaskGroup): Promise<TaskGroup | Error>;
  update(taskGroup: TaskGroup): Promise<TaskGroup | Error>;
  delete(id: UniqueEntityID): Promise<number | Error>; // numberは削除件数
}
