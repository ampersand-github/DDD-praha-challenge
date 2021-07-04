import { Task } from '../../../domain/task/task';
import { Prisma, PrismaClient, Task as PrismaTaskProps } from '@prisma/client';
import { TaskGroup, taskGroupType } from '../../../domain/taskGroup/taskGroup';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { ITaskRepository } from '../../../domain/task/repositoryInterface/ITaskRepository';

export class TaskRepository implements ITaskRepository {
  private prismaClient: PrismaClient = new PrismaClient();

  private static convertTo(data: PrismaTaskProps): Task {
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

  public async findAll(): Promise<Task[]> {
    const findMany = await this.prismaClient.task.findMany({
      orderBy: {
        taskNo: 'asc',
      },
    });
    return findMany.map((one) => TaskRepository.convertTo(one));
  }

  public async findOne(id: string): Promise<Task> {
    const taskData = await this.prismaClient.task.findUnique({
      where: {
        taskId: id,
      },
    });
    return TaskRepository.convertTo(taskData);
  }

  public async findByTaskGroup(taskGroup: TaskGroup): Promise<Task[]> {
    const taskData = await this.prismaClient.task.findMany({
      where: {
        taskGroupName: taskGroup.taskGroup,
      },
    });
    return taskData.map((one) => {
      return TaskRepository.convertTo(one);
    });
  }

  public async create(task: Task): Promise<Task> {
    const prismaTask = await this.prismaClient.task.create({
      data: {
        taskId: task.id.toValue(),
        taskNo: task.no,
        taskName: task.name,
        description: task.description,
        taskGroupName: task.group,
      },
    });
    return TaskRepository.convertTo(prismaTask);
  }

  public async delete(task: Task): Promise<number> {
    const result1 = await this.prismaClient.participantHavingTask.deleteMany({
      where: {
        taskId: task.id.toValue(),
      },
    });
    const result2 = await this.prismaClient.task.deleteMany({
      where: {
        taskId: task.id.toValue(),
      },
    });
    return result1.count + result2.count;
  }

  public async update(task: Task): Promise<Task> {
    const prismaTask = await this.prismaClient.task.update({
      where: {
        taskId: task.id.toValue(),
      },
      data: {
        taskNo: task.no,
        taskName: task.name,
        description: task.description,
        taskGroupName: task.group,
      },
    });
    return TaskRepository.convertTo(prismaTask);
  }

  public async taskMaxNo(): Promise<number> {
    const result = await this.prismaClient.task.findFirst({
      select: {
        taskNo: true,
      },
      orderBy: {
        taskNo: 'desc',
      },
    });
    if (result === null) {
      return 0;
    }
    return result.taskNo;
  }

  public async reAssignTaskNo(): Promise<void> {
    /*
    taskNoを再構成する処理
    欠番を埋めたりとかする
    taskNoがユニークなのでそのまま更新できない。
    いったん+10000した値にしておいて、その後、改めて振り分ける
    */
    const findMany = await this.prismaClient.task.findMany({
      orderBy: {
        taskNo: 'asc',
      },
    });
    const updates = findMany.map((one) => {
      return this.prismaClient.task.update({
        where: {
          taskId: one.taskId,
        },
        data: {
          taskNo: one.taskNo + 1000,
        },
      });
    });
    await this.prismaClient.$transaction(updates);
    const findMany2 = await this.prismaClient.task.findMany({
      orderBy: {
        taskNo: 'asc',
      },
    });
    const updates2 = findMany2.map((one, index) => {
      return this.prismaClient.task.update({
        where: {
          taskId: one.taskId,
        },
        data: {
          taskNo: index + 1, // indexが0から始まるので,
        },
      });
    });
    await this.prismaClient.$transaction(updates2);
  }
}
