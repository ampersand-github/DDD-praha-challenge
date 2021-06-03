import { Task } from '../task';
import { UniqueEntityID } from '../../shared/UniqueEntityID';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findOne(taskId: UniqueEntityID): Promise<Task | Error>;
  create(task: Task): Promise<Task | Error>;
  update(task: Task): Promise<Task | Error>;
  delete(taskId: UniqueEntityID): Promise<number | Error>; // numberは削除件数
  nextTaskNo(): Promise<number>;
  reAssignTaskNo(): Promise<void | Error>;
}
