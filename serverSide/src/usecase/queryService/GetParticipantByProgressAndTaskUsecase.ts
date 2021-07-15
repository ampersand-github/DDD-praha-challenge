import { GetParticipantByProgressAndTaskQueryService } from '../../infra/db/queryService/getParticipantByProgressAndTaskQueryService';
import { ProgressStatus, ProgressStatusEnum } from '../../domain/participant/progressStatus';
import { ParticipantDTO } from '../participant/DTO/participantDTO';
import { TaskRepository } from '../../infra/db/repository/taskRepository';
import { Task } from '../../domain/task/task';

type AtLeast1Task = [Task, ...Task[]];

export class GetParticipantByProgressAndTaskUsecase {
  private readonly queryService: GetParticipantByProgressAndTaskQueryService;
  private readonly taskRepository: TaskRepository;

  public constructor(queryService: GetParticipantByProgressAndTaskQueryService) {
    this.queryService = queryService;
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
