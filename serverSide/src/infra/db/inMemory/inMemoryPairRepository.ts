/* eslint-disable */

import { PrismaClient } from '@prisma/client';
import { Participant } from '../../../domain/participant/participant';
import { Pair } from '../../../domain/pair/pair';
import { IPairRepository } from '../../../domain/pair/repositoryInterface/IPairRepository';

export class InMemoryPairRepository implements IPairRepository {
  private prismaClient: PrismaClient = new PrismaClient();

  public addParticipant(pairName: string, participants: Participant[]): Promise<Pair> {
    return Promise.resolve(undefined);
  }

  public create(pair: Pair): Promise<Pair> {
    return Promise.resolve(undefined);
  }

  public delete(pair: Pair): Promise<number> {
    return Promise.resolve(0);
  }

  public findAll(): Promise<Pair[]> {
    return Promise.resolve([]);
  }

  public findOne(pairName: string): Promise<Pair> {
    return Promise.resolve(undefined);
  }

  public removeParticipant(pairName: string, participants: Participant[]): Promise<Pair> {
    return Promise.resolve(undefined);
  }
}
