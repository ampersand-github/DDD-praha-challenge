import { Practice, PrismaClient } from '@prisma/client';
import { IUpdateRepository } from '../usecase/practice/repository/IUpdateRepository';

export class updateRepository implements IUpdateRepository {
  private prismaClient: PrismaClient;

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async update(id: number, text: string): Promise<Practice> {
    return await this.prismaClient.practice.update({
      where: { id: id },
      data: { text: text },
    });
  }
}
