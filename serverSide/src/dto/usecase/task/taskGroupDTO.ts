import { TaskGroup } from '../../../domain/task/taskGroup';

export class TaskGroupDTO {
  public readonly group: string;
  public constructor(props: TaskGroup) {
    this.group = props.taskGroup;
  }
}
