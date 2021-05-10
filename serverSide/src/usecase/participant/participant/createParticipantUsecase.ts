import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';

export class CreateParticipantUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }

  public async do() {
    /*
todo
  ユーザーの追加
  ペアの追加
  チームの追加
  在籍ステータスの追加
  ユーザー保有課題の追加
 */
  }
}
