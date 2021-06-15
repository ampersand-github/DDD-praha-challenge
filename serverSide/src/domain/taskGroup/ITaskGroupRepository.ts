import { TaskGroup } from './taskGroup';

export interface ITaskGroupRepository {
  findAll(): Promise<TaskGroup[]>;
  findOne(taskGroup: string): Promise<TaskGroup>;
  create(taskGroup: TaskGroup): Promise<TaskGroup>;
  update(taskGroup: TaskGroup): Promise<TaskGroup>;
  delete(taskGroup: TaskGroup): Promise<number>; // numberは削除件数
}
