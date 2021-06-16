import { Task } from '../task';
import { TaskGroup } from '../../taskGroup/taskGroup';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findOne(taskId: string): Promise<Task>;
  findByTaskGroup(taskGroup: TaskGroup): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(task: Task): Promise<number>; // numberは削除件数
  nextTaskNo(): Promise<number>;
  reAssignTaskNo(): Promise<void>;
}
