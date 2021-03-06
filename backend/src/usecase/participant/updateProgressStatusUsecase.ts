import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../../domain/participant/participant';
import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';
import { Task } from '../../domain/task/task';
import { ParticipantHavingTaskCollectionDTO } from './DTO/participantHavingTasksDTO';

interface UpdateParticipantHavingTasksUsecaseProps {
  participantId: string;
  taskId: string;
  progressStatus: string;
}

export class UpdateParticipantHavingTasksUsecase {
  private readonly participantRepository: IParticipantRepository;
  private readonly taskRepository: ITaskRepository;
  public constructor(
    participantRepository: IParticipantRepository,
    taskRepository: ITaskRepository,
  ) {
    this.participantRepository = participantRepository;
    this.taskRepository = taskRepository;
  }

  public async do(
    props: UpdateParticipantHavingTasksUsecaseProps,
  ): Promise<ParticipantHavingTaskCollectionDTO> {
    const [currentParticipant, task]: [Participant, Task] = await Promise.all([
      this.participantRepository.findOne(props.participantId),
      this.taskRepository.findOne(props.taskId),
    ]);
    //
    currentParticipant.changeProgressStatus(task, props.progressStatus);
    return new ParticipantHavingTaskCollectionDTO(currentParticipant);
  }
}
