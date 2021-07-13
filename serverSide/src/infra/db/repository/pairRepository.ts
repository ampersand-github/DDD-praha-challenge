import { PrismaClient } from '@prisma/client';
import { IPairRepository } from '../../../domain/pair/repositoryInterface/IPairRepository';
import { Pair } from '../../../domain/pair/pair';
import { IConverter } from './shared/converter';
import { prismaClient } from '../../../util/prisma/prismaClient';
import { dummyWithdrawal } from '../../../testUtil/dummy/dummyEnrolledStatus';

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
    return Promise.all(findManyPair.map((one) => this.converter.toPair(one)));
  }

  public async findOne(pairId: string): Promise<Pair> {
    const result = await prismaClient.pair.findUnique({
      where: { pairId: pairId },
      include: {
        participants: {
          include: { personalInfo: true, participantHavingTask: true },
        },
      },
    });
    return this.converter.toPair(result);
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
    await prismaClient.participant.updateMany({
      where: { pairName: pair.pairName },
      data: {
        pairName: null,
      },
    });

    await Promise.all(
      pair.participants.map(async (one) => {
        await prismaClient.participant.update({
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

  public async delete(pair: Pair): Promise<number> {
    return Promise.resolve(0);
  }
}
