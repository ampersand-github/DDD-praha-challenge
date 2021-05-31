import { Task } from '../../domain/task/task';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findOne(taskId: UniqueEntityID): Promise<Task | Error>;
  create(task: Task): Promise<Task | Error>;
  update(task: Task): Promise<Task | Error>;
  delete(taskId: UniqueEntityID): Promise<number | Error>; // numberは削除件数
  nextTaskNo(): Promise<number>;
  reAssignTaskNo(): Promise<void | Error>;
}
