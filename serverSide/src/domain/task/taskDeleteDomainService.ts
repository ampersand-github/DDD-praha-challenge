import { IParticipantRepository } from '../participant/repositoryInterface/IParticipantRepository';
import { ITaskRepository } from './repositoryInterface/ITaskRepository';

interface TaskDeleteDomainServiceProps {
  taskId: string;
}

export class TaskDeleteDomainService {
  private readonly taskRepository: ITaskRepository;
  private readonly participantRepository: IParticipantRepository;

  public constructor(
    taskRepository: ITaskRepository,
    participantRepository: IParticipantRepository,
  ) {
    this.taskRepository = taskRepository;
    this.participantRepository = participantRepository;
  }

  public async do(props: TaskDeleteDomainServiceProps): Promise<void> {
    const shouldDeleteTask = await this.taskRepository.findOne(props.taskId);
    await this.participantRepository.deleteUserHavingTasksByTask(shouldDeleteTask);
    await this.taskRepository.delete(shouldDeleteTask);
  }
}
