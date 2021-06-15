import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { PersonalInfo } from '../../domain/participant/personalInfo';
import { DisallowDuplicateMailAddressService } from '../../domain/participant/service/disallowDuplicateMailaddressService';

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

  public async do(props: UpdatePersonalInfoUsecaseProps): Promise<PersonalInfo> {
    // idから参加者ドメインオブジェクトを取得
    let participant = await this.repo.findOne(props.participantId);
    if (!participant) {
      throw new Error('この参加者は存在しません。');
    }

    //
    // メールアドレスのアップデート
    if (props.shouldUpdateMailAddress) {
      await this.service.do({ mailAddress: props.shouldUpdateMailAddress });
      participant = participant.changeMailAddress(props.shouldUpdateMailAddress);
    }

    // 名前のアップデート
    if (props.shouldUpdateName) {
      participant = participant.changeParticipantName(props.shouldUpdateName);
    }

    // DBに登録
    return await this.repo.updatePersonalInfo(participant);
  }
}
