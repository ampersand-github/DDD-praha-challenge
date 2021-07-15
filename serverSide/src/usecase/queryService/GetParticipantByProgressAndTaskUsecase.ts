import { ProgressStatus, ProgressStatusEnum } from '../../domain/participant/progressStatus';
import { ParticipantDTO } from '../participant/DTO/participantDTO';
import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';
import {
  AtLeast1Task,
  IGetParticipantByProgressAndTaskQueryService,
} from './GetParticipantByProgressAndTaskQueryService';

export class GetParticipantByProgressAndTaskUsecase {
  private readonly queryService: IGetParticipantByProgressAndTaskQueryService;
  private readonly taskRepository: ITaskRepository;

  public constructor(
    queryService: IGetParticipantByProgressAndTaskQueryService,
    taskRepository: ITaskRepository,
  ) {
    this.queryService = queryService;
    this.taskRepository = taskRepository;
  }

  public async do(
    taskIdList: [string, ...string[]], // stringが1つ以上ある配列
    progressStatus: string,
    page,
  ): Promise<ParticipantDTO[]> {
    const status = ProgressStatus.create({ progressStatus: ProgressStatusEnum.complete });
    const taskList = (await Promise.all(
      taskIdList.map((id) => this.taskRepository.findOne(id)),
    )) as AtLeast1Task;
    const take = 10; // todo ルールはドメインに書くべきだがqueryServiceの場合ドメインがない。ではこのルールはどこに書くべきか？
    const result = await this.queryService.do(taskList, status, take, page);
    return result.map((one) => new ParticipantDTO(one));
  }
}
