import { IPairRepository } from '../repositoryInterface/IPairRepository';
import { Pair } from '../pair';
import { Participant } from '../../participant/participant';

interface DistributeOneParticipantForAnotherPairDomainServiceProps {
  pair: Pair;
  shouldBeDistributedParticipant: Participant;
}

export class DistributeOneParticipantForAnotherPairDomainService {
  private readonly pairRepository: IPairRepository;

  public constructor(repository: IPairRepository) {
    this.pairRepository = repository;
  }

  public async do(props: DistributeOneParticipantForAnotherPairDomainServiceProps): Promise<void> {
    /*
	2人 -> 1人になるペアを他のペアに吸収させる
	*/
    // 条件
    if (props.pair.participants.length !== 2) {
      throw new Error('ペア数が2人ではありません。');
    }
    if (!props.pair.participants.includes(props.shouldBeDistributedParticipant)) {
      throw new Error('他のペアに振り分けられるべき参加者がこのこのペアに参加していません。');
    }

    // 参加者が追加されるペアを選定
    const allPair = await this.pairRepository.findAll();
    // 2名のペアでかつ、自分自身以外のペア一覧
    const twoParticipantPair = allPair.filter((one) => {
      return one !== props.pair && one.participants.length === 2;
    });
    // todo 参加者保有課題の完了数が近いペアに振り分けたい。いづれ作るかもしれない
    const bestMatchPair: Pair = twoParticipantPair[0];

    const pair = bestMatchPair.addParticipant(props.shouldBeDistributedParticipant);

    // ペアが確定したので、1名になったペアは削除される
    await this.pairRepository.delete(props.pair);
    await this.pairRepository.update(pair);
  }
}
