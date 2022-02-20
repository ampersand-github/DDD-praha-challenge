import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';
import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { TaskGroupDeleteDomainService } from '../../domain/taskGroup/taskGroupDeleteDomainService';

interface DeleteTaskGroupUsecaseProps {
  taskGroup: string;
}

export class DeleteTaskGroupUsecase {
  private readonly taskRepository: ITaskRepository;
  private readonly participantRepository: IParticipantRepository;

  public constructor(
    taskRepository: ITaskRepository,
    participantRepository: IParticipantRepository,
  ) {
    this.taskRepository = taskRepository;
    this.participantRepository = participantRepository;
  }
  public async do(props: DeleteTaskGroupUsecaseProps): Promise<void> {
    const taskGroupDeleteDomainService = new TaskGroupDeleteDomainService(
      this.taskRepository,
      this.participantRepository,
    );
    await taskGroupDeleteDomainService.do({ taskGroup: props.taskGroup });
  }
}
