import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';

export class deleteParticipantUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }
  // todo any型をParticipant型へ変更する
  public async do(id: string): Promise<any> {
    /*
        todo
         ・リポジトリへidを引き渡す
         */
    // todo 参加者テーブルだけではなく参加者集約ごと削除できているかはテストする必要がある
  }
}
