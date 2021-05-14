import { ValueObject } from '../../shared/domain/ValueObject';
import { TaskGroup } from './taskGroup';

interface TaskProps {
  no: number;
  name: string;
  description: string;
  group: TaskGroup;
}

export class Task extends ValueObject<TaskProps> {
  public get no() {
    return this.props.no;
  }
  public get name() {
    return this.props.name;
  }
  public get description() {
    return this.props.description;
  }

  public get group() {
    return this.props.group.taskGroup;
  }
  private constructor(props: TaskProps) {
    super(props);
  }
  public static create(props: TaskProps): Task {
    return new Task(props);
  }
}
