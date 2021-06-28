import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';
import { TaskDeleteDomainService } from '../../domain/task/taskDeleteDomainService';
import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';

interface DeleteTaskUsecaseProps {
  id: string;
}

export class DeleteTaskUsecase {
  private readonly taskRepository: ITaskRepository;
  private readonly participantRepository: IParticipantRepository;

  public constructor(
    taskRepository: ITaskRepository,
    participantRepository: IParticipantRepository,
  ) {
    this.taskRepository = taskRepository;
    this.participantRepository = participantRepository;
  }

  public async do(props: DeleteTaskUsecaseProps): Promise<void> {
    const taskDeleteDomainService = new TaskDeleteDomainService(
      this.taskRepository,
      this.participantRepository,
    );
    await taskDeleteDomainService.do({ taskId: props.id });
  }
}
