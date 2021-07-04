import { Pair } from '../../../domain/pair/pair';
import { IPairRepository } from '../../../domain/pair/repositoryInterface/IPairRepository';

export class InMemoryPairRepository implements IPairRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public create(pair: Pair): Promise<Pair> {
    return Promise.resolve(undefined);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(pair: Pair): Promise<number> {
    return Promise.resolve(0);
  }

  public findAll(): Promise<Pair[]> {
    return Promise.resolve([]);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public findOne(pairName: string): Promise<Pair> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(pair: Pair): Promise<Pair> {
    return Promise.resolve(undefined);
  }
}
