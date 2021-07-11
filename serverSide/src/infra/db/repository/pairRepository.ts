import { PrismaClient, Task as PrismaTaskProps } from '@prisma/client';
import { IPairRepository } from '../../../domain/pair/repositoryInterface/IPairRepository';
import { Pair } from '../../../domain/pair/pair';

export class PairRepository implements IPairRepository {
  private readonly prismaClient: PrismaClient;

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async findAll(): Promise<Pair[]> {
    return Promise.resolve([]);
  }

  public async findOne(pairName: string): Promise<Pair> {
    return Promise.resolve(undefined);
  }

  public async create(pair: Pair): Promise<Pair> {
    return Promise.resolve(undefined);
  }

  public async update(pair: Pair): Promise<Pair> {
    return Promise.resolve(undefined);
  }

  public async delete(pair: Pair): Promise<number> {
    return Promise.resolve(0);
  }

  /*

  public async findAll(): Promise<Task[]> {
    const findMany = await this.prismaClient.task.findMany({
      orderBy: {
        taskNo: 'asc',
      },
    });
    return findMany.map((one) => TaskRepository.convertTo(one));
  }
 */

  /*
  public async findOne(id: string): Promise<Task> {
    const taskData = await this.prismaClient.task.findUnique({
      where: {
        taskId: id,
      },
    });
    return TaskRepository.convertTo(taskData);
  }
 */

  /*
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
 */

  /*
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
 */

  /*
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
 */

  /*
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
 */
}
