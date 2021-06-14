import { Pair } from '../pair';
import { Participant } from '../../participant/participant';

export interface IPairRepository {
  findAll(): Promise<Pair[]>;
  findOne(pairName: string): Promise<Pair>;
  create(pair: Pair): Promise<Pair>;
  removeParticipant(pairName: string, participants: Participant[]): Promise<Pair>;
  addParticipant(pairName: string, participants: Participant[]): Promise<Pair>;
  delete(pair: Pair): Promise<number>; // numberは削除件数
}
