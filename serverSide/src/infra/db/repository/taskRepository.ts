import { Task } from '../../../domain/task/task';
import { Prisma, PrismaClient } from '@prisma/client';
import { TaskGroup, taskGroupType } from '../../../domain/taskGroup/taskGroup';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { ITaskRepository } from '../../../domain/task/repositoryInterface/ITaskRepository';

/*
prismaのindex.d.tsをそのままもってきた。
index.d.tsのをimportしたかったが、
type名がドメインオブジェクトと被ってimportできないので、
ここで同じものを定義した。
 */
type PrismaTaskProps = {
  taskId: string;
  taskNo: number;
  taskName: string;
  description: string;
  taskGroupName: string;
  createdAt: Date;
  updatedAt: Date;
};

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

  public async findOne(id: UniqueEntityID): Promise<Task | Error> {
    const taskData = await this.prismaClient.task.findUnique({
      where: {
        taskId: id.toValue(),
      },
    });

    if (taskData === null) {
      return new Error(`このレコードは存在しません。`);
    }

    return TaskRepository.convertTo(taskData);
  }

  public async create(task: Task): Promise<Task | Error> {
    try {
      await this.prismaClient.task.create({
        data: {
          taskId: task.id.toValue(),
          taskNo: task.no,
          taskName: task.name,
          description: task.description,
          taskGroupName: task.group,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return new Error(
            `${e.meta['target'][0]}が重複していますので作成されませんでした。`,
          );
        }
      }
    }
  }

  public async delete(taskId: UniqueEntityID): Promise<number> {
    // prisma.〇〇.deleteManyではカスケード削除ができない。
    // prismaの仕様がまだ対応していないらしい
    // でもsqlでならカスケード削除がいける
    return await this.prismaClient.$executeRaw(
      `delete
         FROM public."Task"
         where "taskId" = $1`,
      taskId.toValue(),
    );
  }

  public async update(task: Task): Promise<Task | Error> {
    try {
      await this.prismaClient.task.update({
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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return new Error(`更新すべきレコードが見つかりませんでした。`);
        }
        if (e.code === 'P2002') {
          return new Error(
            `${e.meta['target'][0]}が重複していますので更新されませんでした。`,
          );
        }
      }
      console.log(e);
    }
  }

  public async nextTaskNo(): Promise<number> {
    // taskNoの最大値を取得して+1を返す
    const result = await this.prismaClient.task.findFirst({
      select: {
        taskNo: true,
      },
      orderBy: {
        taskNo: 'desc',
      },
    });
    if (result === null) {
      return 1;
    }
    return result.taskNo + 1;
  }

  public async reAssignTaskNo(): Promise<void | Error> {
    // taskNoを再構成する処理
    // 欠番を埋めたりとかする
    // taskNoがユニークなのでそのまま更新できない。
    // いったん+10000した値にしておいて、その後、改めて振り分ける
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
