import { Practice, PrismaClient } from '@prisma/client';
import { IDeleteRepository } from '../usecase/practice/repository/IDeleteRepository';

export class deleteRepository implements IDeleteRepository {
  private prismaClient: PrismaClient;

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async delete(id: number): Promise<Practice> {
    return await this.prismaClient.practice.delete({ where: { id: id } });
  }
}
