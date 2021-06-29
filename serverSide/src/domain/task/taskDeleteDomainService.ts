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
    const allParticipant = await this.participantRepository.findAll();
    // 参加者から参加者保有課題を削除して更新
    allParticipant.map(async (one) => {
      one.deleteByTask([shouldDeleteTask]);
      await this.participantRepository.update(one);
    });
    await this.taskRepository.delete(shouldDeleteTask);
  }
}
