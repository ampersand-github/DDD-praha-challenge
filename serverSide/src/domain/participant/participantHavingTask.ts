import { Task } from '../task/task';
import { ProgressStatus } from './progressStatus';
import { ValueObject } from '../shared/ValueObject';

export interface ParticipantHavingTaskProps {
  task: Task;
  progressStatus: ProgressStatus;
}

export class ParticipantHavingTask extends ValueObject<ParticipantHavingTaskProps> {
  public get participantHavingTask() {
    return this.props;
  }
  public get progressStatus() {
    return this.props.progressStatus;
  }
  public get task() {
    return this.props.task;
  }

  private constructor(props: ParticipantHavingTaskProps) {
    super(props);
  }

  public static create(props: ParticipantHavingTaskProps): ParticipantHavingTask {
    return new ParticipantHavingTask(props);
  }
  // todo 一つ上の階層にあげる
  public changeProgressStatus(updateStatus: string): ParticipantHavingTask {
    this.props.progressStatus = this.props.progressStatus.changeStatus(updateStatus);
    return this;
  }
}
