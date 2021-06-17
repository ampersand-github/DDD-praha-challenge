import { ITaskRepository } from '../task/repositoryInterface/ITaskRepository';
import { ITaskGroupRepository } from './ITaskGroupRepository';
import { IParticipantRepository } from '../participant/repositoryInterface/IParticipantRepository';

interface TaskGroupDeleteDomainServiceProps {
  taskGroup: string;
}

export class TaskGroupDeleteDomainService {
  private readonly taskRepository: ITaskRepository;
  private readonly taskGroupRepository: ITaskGroupRepository;
  private readonly participantRepository: IParticipantRepository;

  public constructor(
    taskRepository: ITaskRepository,
    taskGroupRepository: ITaskGroupRepository,
    participantRepository: IParticipantRepository,
  ) {
    this.taskRepository = taskRepository;
    this.taskGroupRepository = taskGroupRepository;
    this.participantRepository = participantRepository;
  }

  public async do(props: TaskGroupDeleteDomainServiceProps): Promise<void> {
    const taskGroupDeleteTarget = await this.taskGroupRepository.findOne(props.taskGroup);
    const taskDeleteTarget = await this.taskRepository.findByTaskGroup(taskGroupDeleteTarget);
    for (const task of taskDeleteTarget) {
      await this.participantRepository.deleteUserHavingTasksByTask(task);
      await this.taskRepository.delete(task);
    }
    await this.taskGroupRepository.delete(taskGroupDeleteTarget);
  }
}
