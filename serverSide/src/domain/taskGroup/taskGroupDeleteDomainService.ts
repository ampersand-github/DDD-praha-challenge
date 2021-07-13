import { ITaskRepository } from '../task/repositoryInterface/ITaskRepository';
import { IParticipantRepository } from '../participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../participant/participant';
import { Task } from '../task/task';
import { TaskGroup } from './taskGroup';

interface TaskGroupDeleteDomainServiceProps {
  taskGroup: string;
}

export class TaskGroupDeleteDomainService {
  private readonly taskRepository: ITaskRepository;
  private readonly participantRepository: IParticipantRepository;

  public constructor(
    taskRepository: ITaskRepository,
    participantRepository: IParticipantRepository,
  ) {
    this.taskRepository = taskRepository;
    this.participantRepository = participantRepository;
  }

  public async do(props: TaskGroupDeleteDomainServiceProps): Promise<void> {
    const shouldDeleteTaskGroup = TaskGroup.create({ taskGroup: props.taskGroup });
    const taskDeleteTargetList = await this.taskRepository.findByTaskGroup(shouldDeleteTaskGroup);
    const allParticipant = await this.participantRepository.findAll();

    const updateList: Participant[] = allParticipant.map((one: Participant) => {
      return this.deleteHavingTaskByTaskList(one, taskDeleteTargetList);
    });

    await Promise.all(
      updateList.map(async (one) => {
        await this.participantRepository.update(one);
      }),
    );

    await Promise.all(
      taskDeleteTargetList.map(async (task: Task) => {
        await this.taskRepository.delete(task);
      }),
    );

    // タスクグループはEnumを手動削除
  }

  private deleteHavingTaskByTaskList(
    participant: Participant,
    shouldDeleteTaskList: Task[],
  ): Participant {
    shouldDeleteTaskList.map((task) => {
      participant.deleteHavingTask(task);
    });
    return participant;
  }
}
