import { ProgressStatus } from '../../domain/participant/progressStatus';
import { ParticipantDTO } from '../participant/DTO/participantDTO';
import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';
import { IGetParticipantByProgressAndTaskQueryService } from './interface/IGetParticipantByProgressAndTaskQueryService';

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
    const status = ProgressStatus.create({ progressStatus: progressStatus });
    const taskList = await Promise.all(taskIdList.map((id) => this.taskRepository.findOne(id)));
    const take = 10;
    const result = await this.queryService.do(
      [taskList[0], ...taskList.slice(1)],
      status,
      take,
      page,
    );
    return result.map((one) => new ParticipantDTO(one));
  }
}
