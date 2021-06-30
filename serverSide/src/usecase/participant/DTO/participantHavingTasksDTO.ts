import { TaskDTO } from '../../task/DTO/taskDTO';

import { Participant } from '../../../domain/participant/participant';

export class ParticipantHavingTaskCollectionDTO {
  public readonly tasks: [TaskDTO, string][];

  public constructor(props: Participant) {
    const taskList = [];
    for (const participantHavingTask of props.participantHavingTaskCollection) {
      taskList.push([
        new TaskDTO(participantHavingTask.task),
        participantHavingTask.progressStatus.progressStatus,
      ]);
    }
    this.tasks = taskList;
  }
}
