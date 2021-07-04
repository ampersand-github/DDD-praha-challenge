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
    const shouldDeleteTaskGroup = await this.taskGroupRepository.findOne(props.taskGroup);
    const taskDeleteTargetList = await this.taskRepository.findByTaskGroup(shouldDeleteTaskGroup);
    const allParticipant = await this.participantRepository.findAll();

    // 参加者から参加者保有課題を削除して更新
    /*
    allParticipant.map(async (one) => {
      one.deleteByTask(taskDeleteTargetList);
      await this.participantRepository.update(one);
    });
 */
    await this.taskGroupRepository.delete(shouldDeleteTaskGroup);
  }
}
