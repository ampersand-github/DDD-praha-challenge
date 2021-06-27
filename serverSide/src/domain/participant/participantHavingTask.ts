import { Task } from '../task/task';
import { ProgressStatus } from './progressStatus';
import { Entity } from '../shared/Entity';
import { UniqueEntityID } from '../shared/UniqueEntityID';

export interface ParticipantHavingTaskProps {
  task: Task;
  progressStatus: ProgressStatus;
}

export class ParticipantHavingTask extends Entity<ParticipantHavingTaskProps> {
  public get participantHavingTask() {
    return this.props;
  }
  public get progressStatus() {
    return this.props.progressStatus;
  }
  public get task() {
    return this.props.task;
  }

  private constructor(props: ParticipantHavingTaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ParticipantHavingTaskProps,
    id?: UniqueEntityID,
  ): ParticipantHavingTask {
    return new ParticipantHavingTask(props, id);
  }

  public changeProgressStatus(updateStatus: string): ParticipantHavingTask {
    this.props.progressStatus = this.props.progressStatus.changeStatus(updateStatus);
    return this;
  }
}
