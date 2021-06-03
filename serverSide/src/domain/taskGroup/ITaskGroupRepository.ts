import { UniqueEntityID } from '../shared/UniqueEntityID';
import { TaskGroup } from './taskGroup';

export interface ITaskGroupRepository {
  findAll(): Promise<TaskGroup[]>;
  create(taskGroup: TaskGroup): Promise<TaskGroup | Error>;
  update(taskGroup: TaskGroup): Promise<TaskGroup | Error>;
  delete(id: UniqueEntityID): Promise<number | Error>; // numberは削除件数
}
