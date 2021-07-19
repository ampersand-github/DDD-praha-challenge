import { Pair } from '../pair';
import { Participant } from '../../participant/participant';

export interface IPairRepository {
  findAll(): Promise<Pair[]>;
  findOne(pairName: string): Promise<Pair>;
  create(pair: Pair): Promise<Pair>;
  update(pair: Pair): Promise<Pair>;
  delete(pair: Pair): Promise<void>;
  findOneByParticipant(participant: Participant): Promise<Pair>;
}
