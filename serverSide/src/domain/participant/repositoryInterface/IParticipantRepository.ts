import { Participant } from '../participant';
import { Task } from '../../task/task';

export interface IParticipantRepository {
  findAll(): Promise<Participant[]>;
  findOne(participantId: string): Promise<Participant | null>;
  isExistMailAddress(mailAddress: string): Promise<boolean>;
  create(participant: Participant): Promise<Participant>;
  update(participant: Participant): Promise<Participant>;
  delete(participant: Participant): Promise<number>; // numberは削除件数
}
