import { IPairRepository } from '../repositoryInterface/IPairRepository';
import { Pair } from '../pair';
import { Participant } from '../../participant/participant';
import { PairFactory } from './pairFactory';

interface DividePairDomainServiceProps {
  pair: Pair;
  addParticipant: Participant;
}

export class DividePairDomainService {
  private readonly pairRepository: IPairRepository;

  public constructor(repository: IPairRepository) {
    this.pairRepository = repository;
  }

  public async do(props: DividePairDomainServiceProps): Promise<Pair[]> {
    /*
    ４名のペアを2名、2組に振り分ける
    */
    if (props.pair.participants.length !== 3) {
      throw new Error('引数で与えられたペアが3名ではありません。');
    }

    // todo ペアの誰を別のペアに移籍させるか、参加者保有課題の進捗で判断したい。今後余裕があったらやる
    const moveParticipant = props.pair.participants[0];

    props.pair.removeParticipant(moveParticipant);

    // 新規ペアの作成
    const factory = new PairFactory(this.pairRepository);
    const newPair = await factory.do({
      participants: [moveParticipant, props.addParticipant],
    });
    // update
    return [
      await this.pairRepository.update(props.pair),
      await this.pairRepository.update(newPair),
    ];
  }
}
