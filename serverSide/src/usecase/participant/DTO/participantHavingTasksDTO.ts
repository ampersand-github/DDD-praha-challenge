import { TaskDTO } from '../../task/DTO/taskDTO';
import { ParticipantHavingTasks } from '../../../domain/participant/participantHavingTasks';

export class ParticipantHavingTasksDTO {
  private readonly tasks: [TaskDTO, string][];

  public get participantHavingTasks(): [TaskDTO, string][] {
    return this.tasks;
  }

  public constructor(props: ParticipantHavingTasks) {
    const taskList = [];
    for (const [task, progressStatus] of props.statusAndTasks) {
      taskList.push([new TaskDTO(task), progressStatus.progressStatus]);
    }
    this.tasks = taskList;
  }
}
