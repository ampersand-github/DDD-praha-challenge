import {
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
  PrismaClient,
} from '@prisma/client';
import { IPairRepository } from '../../../domain/pair/repositoryInterface/IPairRepository';
import { Pair } from '../../../domain/pair/pair';
import { IConverter } from './shared/converter';
import { prismaClient } from '../../../util/prisma/prismaClient';

export class PairRepository implements IPairRepository {
  private readonly prismaClient: PrismaClient;
  private readonly converter: IConverter;

  public constructor(prismaClient: PrismaClient, converter: IConverter) {
    this.prismaClient = prismaClient;
    this.converter = converter;
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
}
