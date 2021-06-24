import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { PairDTO } from './DTO/pairDTO';
import { PairFactory } from '../../domain/pair/domainService/pairFactory';
import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../../domain/participant/participant';

interface CreatePairUsecaseProps {
  participantIds: string[];
}

export class CreatePairUsecase {
  private readonly participantRepository: IParticipantRepository;
  private readonly pairRepository: IPairRepository;
  private readonly factory: PairFactory;

  public constructor(
    participantRepository: IParticipantRepository,
    pairRepository: IPairRepository,
    factory: PairFactory,
  ) {
    this.participantRepository = participantRepository;
    this.pairRepository = pairRepository;
    this.factory = factory;
  }

  public async do(props: CreatePairUsecaseProps): Promise<PairDTO> {
    // idから参加者ドメインオブジェクトの配列を取得
    const participants: Participant[] = await Promise.all(
      props.participantIds.map(async (id) => {
        const result = await this.participantRepository.findOne(id);
        if (result === null) {
          throw new Error('参加者が存在しません。');
        }
        return result;
      }),
    );

    const result = await this.factory.do({ participants: participants });
    return new PairDTO(result);
  }
}
