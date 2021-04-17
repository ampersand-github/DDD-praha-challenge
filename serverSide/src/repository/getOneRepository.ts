import { PrismaClient } from '@prisma/client';
import { PracticeDataDTO } from '../usecase/practice/practiceDataDTO';
import { IGetOneRepository } from '../usecase/practice/repository/IGetOneRepository';

export class getOneRepository implements IGetOneRepository {
  private prismaClient: PrismaClient;
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async getOne(id: number): Promise<PracticeDataDTO[]> {
    const one = await this.prismaClient.practice.findMany({
      where: { id: id },
    });
    return one.map((one) => new PracticeDataDTO({ ...one }));
  }
}
