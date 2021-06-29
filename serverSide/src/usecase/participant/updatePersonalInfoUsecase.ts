import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { PersonalInfo } from '../../domain/participant/personalInfo';
import { DisallowDuplicateMailAddressService } from '../../domain/participant/service/disallowDuplicateMailaddressService';
import { Participant } from '../../domain/participant/participant';

interface UpdatePersonalInfoUsecaseProps {
  participantId: string;
  shouldUpdateName?: string;
  shouldUpdateMailAddress?: string;
}

export class UpdatePersonalInfoUsecase {
  private readonly repo: IParticipantRepository;
  private readonly service: DisallowDuplicateMailAddressService;

  public constructor(
    repository: IParticipantRepository,
    service: DisallowDuplicateMailAddressService,
  ) {
    this.repo = repository;
    this.service = service;
  }

  public async do(props: UpdatePersonalInfoUsecaseProps): Promise<Participant> {
    // idから参加者ドメインオブジェクトを取得
    const participant = await this.repo.findOne(props.participantId);
    if (!participant) {
      throw new Error('この参加者は存在しません。');
    }
    //
    // メールアドレスのアップデート
    if (props.shouldUpdateMailAddress) {
      await this.service.do({ mailAddress: props.shouldUpdateMailAddress });
      participant.changeMailAddress(props.shouldUpdateMailAddress);
    }

    // 名前のアップデート
    if (props.shouldUpdateName) {
      participant.changeParticipantName(props.shouldUpdateName);
    }

    // DBに登録
    return await this.repo.update(participant);
  }
}
