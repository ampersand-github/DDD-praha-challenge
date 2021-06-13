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
    const taskDeleteTarget = await this.taskRepository.findOne(props.taskId);
    await this.participantRepository.deleteByTask(taskDeleteTarget);
    await this.taskRepository.delete(taskDeleteTarget);
  }
}
