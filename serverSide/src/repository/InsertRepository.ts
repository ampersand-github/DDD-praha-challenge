import { Practice, PrismaClient } from '@prisma/client';
import { IInsertRepository } from '../usecase/practice/repository/IInsertRepository';

export class insertRepository implements IInsertRepository {
  private prismaClient: PrismaClient;

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async insert(title: string): Promise<Practice> {
    return await this.prismaClient.practice.create({ data: { text: title } });
  }
}
