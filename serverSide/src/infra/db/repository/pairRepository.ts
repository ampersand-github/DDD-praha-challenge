import { PrismaClient } from '@prisma/client';
import { IPairRepository } from '../../../domain/pair/repositoryInterface/IPairRepository';
import { Pair } from '../../../domain/pair/pair';
import { IConverter } from './shared/converter';


export class PairRepository implements IPairRepository {
  private readonly prismaClient: PrismaClient;
  private readonly converter: IConverter;

  public constructor(prismaClient: PrismaClient, converter: IConverter) {
    this.prismaClient = prismaClient;
    this.converter = converter;
  }

  public async findAll(): Promise<Pair[]> {
    const findManyPair = await this.prismaClient.pair.findMany({
      orderBy: {
        pairName: 'asc',
      },
      include: {
        participants: {
          include: { personalInfo: true, participantHavingTask: true },
        },
      },
    });
    const allPrismaTask = await this.prismaClient.task.findMany();
    return Promise.all(findManyPair.map((one) => this.converter.toPair(one, allPrismaTask)));
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
    return this.converter.toPair(result, allPrismaTask);
  }

  public async create(pair: Pair): Promise<Pair> {
    const participants = pair.participants.map((one) => {
      return {
        participantId: one.id.toValue(),
      };
    });
    await this.prismaClient.pair.create({
      data: {
        pairId: pair.id.toValue(),
        pairName: pair.pairName,
        participants: {
          connect: participants,
        },
      },
      include: { participants: true },
    });
    return await this.findOne(pair.id.toValue());
  }

  public async update(pair: Pair): Promise<Pair> {
    await this.prismaClient.participant.updateMany({
      where: { pairName: pair.pairName },
      data: {
        pairName: null,
      },
    });

    await Promise.all(
      pair.participants.map(async (one) => {
        await this.prismaClient.participant.update({
          where: { participantId: one.id.toValue() },
          data: {
            pair: {
              connect: { pairId: pair.id.toValue() },
              update: { pairName: pair.pairName },
            },
          },
        });
      }),
    );
    return await this.findOne(pair.id.toValue());
  }

  public async delete(pair: Pair): Promise<void> {
    await this.prismaClient.pair.delete({
      where: { pairId: pair.id.toValue() },
    });
  }
}
