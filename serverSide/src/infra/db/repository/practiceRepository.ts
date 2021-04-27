import { Practice, PrismaClient } from '@prisma/client';
import { PracticeDataDTO } from '../../../usecase/practice/dto/practiceDataDTO';
import { IPracticeRepository } from '../../../usecase/practice/repositoryInterface/IPracticeRepository';

export class PracticeRepository implements IPracticeRepository {
  private prismaClient: PrismaClient = new PrismaClient();

  public async getAll(): Promise<PracticeDataDTO[]> {
    const findMany = await this.prismaClient.practice.findMany();
    return findMany.map((one) => new PracticeDataDTO({ ...one }));
  }
  public async getOne(id: number): Promise<PracticeDataDTO[]> {
    const one = await this.prismaClient.practice.findMany({
      where: { id: id },
    });
    return one.map((one) => new PracticeDataDTO({ ...one }));
  }
  public async insert(text: string): Promise<Practice> {
    return await this.prismaClient.practice.create({ data: { text: text } });
  }

  public async update(id: number, text: string): Promise<Practice> {
    return await this.prismaClient.practice.update({
      where: { id: id },
      data: { text: text },
    });
  }
  public async delete(id: number): Promise<Practice> {
    return await this.prismaClient.practice.delete({ where: { id: id } });
  }
}
