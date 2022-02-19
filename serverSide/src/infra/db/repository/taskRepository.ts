import { Task } from '../../../domain/task/task';
import { PrismaClient } from '@prisma/client';
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';
import { ITaskRepository } from '../../../domain/task/repositoryInterface/ITaskRepository';
import { IFromPrismaToTaskConverter } from './shared/converter/ToTaskConverter';

export class TaskRepository implements ITaskRepository {
  private readonly prismaClient: PrismaClient;
  private readonly toTaskConverter: IFromPrismaToTaskConverter;

  public constructor(prismaClient: PrismaClient, ToTaskConverter: IFromPrismaToTaskConverter) {
    this.prismaClient = prismaClient;
    this.toTaskConverter = ToTaskConverter;
  }

  public async findAll(): Promise<Task[]> {
    const findMany = await this.prismaClient.task.findMany({
      orderBy: {
        taskNo: 'asc',
      },
    });
    return findMany.map((one) => this.toTaskConverter.do(one));
  }

  public async findOne(id: string): Promise<Task> {
    const taskData = await this.prismaClient.task.findUnique({
      where: {
        taskId: id,
      },
    });
    return this.toTaskConverter.do(taskData);
  }

  public async findByTaskGroup(taskGroup: TaskGroup): Promise<Task[]> {
    const taskData = await this.prismaClient.task.findMany({
      where: {
        taskGroupName: taskGroup.taskGroup,
      },
    });
    return taskData.map((one) => {
      return this.toTaskConverter.do(one);
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
    return this.toTaskConverter.do(prismaTask);
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
    return this.toTaskConverter.do(prismaTask);
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
