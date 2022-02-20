import { Task as PrismaTask } from '@prisma/client';
import { Task } from '@/domain/task/task';
import { UniqueEntityID } from '@/domain/shared/uniqueEntityID';
import { TaskGroup, taskGroupType } from '@/domain/taskGroup/taskGroup';

export interface IFromPrismaToTaskConverter {
  do(data: PrismaTask): Task;
}

export class ToTaskConverter implements IFromPrismaToTaskConverter {
  public do(data: PrismaTask): Task {
    const taskId = new UniqueEntityID(data.taskId);
    const taskData = {
      no: data.taskNo,
      name: data.taskName,
      description: data.description,
      group: TaskGroup.create({
        taskGroup: data.taskGroupName as taskGroupType,
      }),
    };
    return Task.create(taskData, taskId);
  }
}
