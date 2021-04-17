import { PrismaClient } from '@prisma/client';
import { PracticeDataDTO } from '../usecase/practice/practiceDataDTO';
import { IGetAllRepository } from '../usecase/practice/repository/IGetAllRepository';

export class getAllRepository implements IGetAllRepository {
  private prismaClient: PrismaClient;
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  // todo 疑問 ここにDTO使っていいのか？
  public async getAll(): Promise<PracticeDataDTO[]> {
    const findMany = await this.prismaClient.practice.findMany();
    return findMany.map((one) => new PracticeDataDTO({ ...one }));
  }
}
