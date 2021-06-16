import { IPairRepository } from '../repositoryInterface/IPairRepository';
import { Participant } from '../../participant/participant';

interface DisallowDuplicateParticipantInTPairDomainServiceProps {
  participant: Participant;
}

export class DisallowDuplicateParticipantInTPairDomainService {
  private readonly pairRepository: IPairRepository;

  public constructor(repository: IPairRepository) {
    this.pairRepository = repository;
  }

  public async do(props: DisallowDuplicateParticipantInTPairDomainServiceProps): Promise<void> {
    /*
	ペアに追加したい参加者が既に他のペアに所属していたらエラーを発生させる
	*/
    const allPair = await this.pairRepository.findAll();
    for (const pair of allPair) {
      for (const participant of pair.participants) {
        if (participant === props.participant) {
          throw new Error('この参加者は既に他のペアに所属しています。');
        }
      }
    }
  }
}
