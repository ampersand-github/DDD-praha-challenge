import { TaskGroup } from '../taskGroup/taskGroup';
import { UniqueEntityID } from '../shared/UniqueEntityID';
import { Entity } from '../shared/Entity';

interface TaskProps {
  no: number;
  name: string;
  description: string;
  group: TaskGroup;
}

export class Task extends Entity<TaskProps> {
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
  private constructor(props: TaskProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: TaskProps, id?: UniqueEntityID): Task {
    return new Task(props, id);
  }
  public changeName(name: string) {
    this.props.name = name;
    return this;
  }

  public changeNo(no: number) {
    this.props.no = no;
    return this;
  }
}
