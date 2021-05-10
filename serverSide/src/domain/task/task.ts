import { ValueObject } from '../../shared/domain/ValueObject';
import { TaskGroup } from './taskGroup';

interface TaskProps {
  no: number;
  name: string;
  description: string;
  group: TaskGroup;
}

export class Task extends ValueObject<TaskProps> {
  public get name() {
    return this.props.name;
  }
  private constructor(props: TaskProps) {
    super(props);
  }
  public static create(props: TaskProps): Task {
    return new Task(props);
  }
}
