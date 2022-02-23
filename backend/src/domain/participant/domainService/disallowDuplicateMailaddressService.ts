import { IParticipantRepository } from '../repositoryInterface/IParticipantRepository';

interface DisallowDuplicateMailAddressServiceProps {
  mailAddress: string;
}

export class DisallowDuplicateMailAddressService {
  private readonly participantRepo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.participantRepo = repository;
  }

  public async do(props: DisallowDuplicateMailAddressServiceProps): Promise<void> {
    /*
    メールアドレスが重複していたらエラー出力
    */
    const result = await this.participantRepo.isExistMailAddress(props.mailAddress);
    if (!result) {
      throw new Error('既に存在するメールアドレスです。異なるメールアドレスを入力してください。');
    }
  }
}
