import { Task } from '../../../domain/task/task';

export class TaskDTO {
  public readonly id: string;
  public readonly no: string;
  public readonly name: string;
  public readonly description: string;
  public readonly group: string;
  public constructor(props: Task) {
    this.id = props.id.toValue();
    this.no = props.no.toString();
    this.name = props.name;
    this.description = props.description;
    this.group = props.group;
  }
}
