import { ValueObject } from '../../shared/domain/ValueObject';
import { TaskGroup } from './taskGroup';

interface TaskProps {
  no: number;
  name: string;
  description: string;
  group: TaskGroup;
}

export class Task extends ValueObject<TaskProps> {
  private constructor(props: TaskProps) {
    super(props);
  }
  static create(props: TaskProps): Task {
    return new Task(props);
  }
}
