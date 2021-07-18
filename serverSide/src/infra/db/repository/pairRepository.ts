import { PrismaClient } from '@prisma/client';
import { IPairRepository } from '../../../domain/pair/repositoryInterface/IPairRepository';
import { Pair } from '../../../domain/pair/pair';
import { IFromPrismaToPairConverter } from './shared/dividedConverter/ToPairConverter';

export class PairRepository implements IPairRepository {
  private readonly prismaClient: PrismaClient;
  private readonly toTaskConverter: IFromPrismaToPairConverter;

  public constructor(prismaClient: PrismaClient, ToTaskConverter: IFromPrismaToPairConverter) {
    this.prismaClient = prismaClient;
    this.toTaskConverter = ToTaskConverter;
  }

  public async findOne(pairId: string): Promise<Pair> {
    const result = await this.prismaClient.pair.findUnique({
      where: { pairId: pairId },
      include: {
        participants: {
          include: { personalInfo: true, participantHavingTask: true },
        },
      },
    });
    const allPrismaTask = await this.prismaClient.task.findMany();
    return this.toTaskConverter.do(result, allPrismaTask);
  }

  public async create(pair: Pair): Promise<Pair> {
    return Promise.resolve(undefined);
  }

  public async delete(pair: Pair): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findAll(): Promise<Pair[]> {
    return Promise.resolve([]);
  }

  public async update(pair: Pair): Promise<Pair> {
    return Promise.resolve(undefined);
  }
}
