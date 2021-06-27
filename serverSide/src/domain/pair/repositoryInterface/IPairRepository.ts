import { Pair } from '../pair';

export interface IPairRepository {
  findAll(): Promise<Pair[]>;
  findOne(pairName: string): Promise<Pair>;
  create(pair: Pair): Promise<Pair>;
  update(pair: Pair): Promise<Pair>;
  delete(pair: Pair): Promise<number>; // numberは削除件数
}