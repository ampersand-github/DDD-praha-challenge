import { IParticipantRepository } from '../participant/repositoryInterface/IParticipantRepository';
import { ITaskRepository } from './repositoryInterface/ITaskRepository';
import { Participant } from '../participant/participant';

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
    const allParticipant = await this.participantRepository.findAll();
    const deleteTargetTask = await this.taskRepository.findOne(props.taskId);
    const updateList: Participant[] = allParticipant.map((one: Participant) => {
      one.deleteHavingTask(deleteTargetTask);
      return one;
    });

    await Promise.all(
      updateList.map(async (one) => {
        await this.participantRepository.deleteHavingTaskByDifferenceFromDb(one);
      }),
    );

    await this.taskRepository.delete(deleteTargetTask);
  }
}
