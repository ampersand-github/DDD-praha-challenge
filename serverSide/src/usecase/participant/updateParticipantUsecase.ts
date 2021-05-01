import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';

export class updateParticipantUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }
  // todo any型をParticipant型へ変更する
  public async do(id:string,name?:string,email?:string): Promise<any>  {
  /*
  todo
   ・参加者ドメインオブジェクトに引数を渡して作成
   ・リポジトリへ参加者ドメインオブジェクトを引き渡す
  */
  }
}
