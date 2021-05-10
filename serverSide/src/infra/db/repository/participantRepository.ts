import { PrismaClient } from '@prisma/client';
import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';
import { ParticipantDTO } from '../../../usecase/participant/dto/participantDataDTO';

export class ParticipantRepository implements IParticipantRepository {
  private prismaClient: PrismaClient = new PrismaClient();
  public async getAllParticipant(): Promise<ParticipantDTO[]> {
    const findMany = await this.prismaClient.participant.findMany();
    // dto or domain を返す
    return findMany.map((one) => new ParticipantDTO(one));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public create(text: string): any {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public delete(id: number): any {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public getOne(id: number): any {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public update(id: number, title: string): any {}

  /*
    public async getAll(): Promise<ParticipantDataDTO[]> {
        const findMany = await this.prismaClient.practice.findMany();
        return findMany.map((one) => new ParticipantDataDTO({ ...one }));
    }
    public async getOne(id: number): Promise<ParticipantDataDTO[]> {
        const one = await this.prismaClient.practice.findMany({
            where: { id: id },
        });
        return one.map((one) => new ParticipantDataDTO({ ...one }));
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
 */
}
