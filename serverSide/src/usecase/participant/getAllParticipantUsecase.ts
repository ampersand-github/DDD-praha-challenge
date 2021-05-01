import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { ParticipantDTO } from './dto/participantDataDTO';

export class getAllParticipantUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }
  // todo any型をParticipant型へ変更する
  public async do(): Promise<any> {
  /*
  todo
   ・参加者を全部取得して返す
 */
  }
}
