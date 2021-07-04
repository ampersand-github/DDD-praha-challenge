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

  // todo 再度作り込み
  public async do(props: TaskDeleteDomainServiceProps): Promise<void> {
    const shouldDeleteTask = await this.taskRepository.findOne(props.taskId);
    //  await this.participantRepository.deleteParticipantHavingTaskByTask(shouldDeleteTask);
    await this.taskRepository.delete(shouldDeleteTask);
  }
}
