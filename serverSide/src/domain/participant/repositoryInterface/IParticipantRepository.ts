import { ParticipantDTO } from '../../../usecase/participant/dto/participantDataDTO';

export interface IParticipantRepository {
  getAllParticipant(): Promise<ParticipantDTO[]>;
  getOne(id: number): any;
  create(text: string): any;
  update(id: number, title: string): any;
  delete(id: number): any;
}