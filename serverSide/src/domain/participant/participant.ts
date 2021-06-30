import { Entity } from '../shared/Entity';
import { UniqueEntityID } from '../shared/UniqueEntityID';
import { EnrolledStatus } from './enrolledStatus';
import { PersonalInfo } from './personalInfo';
import { Task } from '../task/task';
import { ParticipantHavingTaskCollection } from './participantHavingTaskCollection';
import { ParticipantHavingTask } from './participantHavingTask';

export interface ParticipantProps {
  personalInfo: PersonalInfo;
  enrolledStatus: EnrolledStatus;
  participantHavingTaskCollection: ParticipantHavingTaskCollection;
}

export class Participant extends Entity<ParticipantProps> {
  public get participantName(): string {
    return this.props.personalInfo.participantName;
  }

  public get mailAddress(): string {
    return this.props.personalInfo.mailAddress;
  }

  public get enrolledStatus(): string {
    return this.props.enrolledStatus.enrolledStatus;
  }

  public get participantHavingTaskCollection(): ParticipantHavingTask[] {
    return this.props.participantHavingTaskCollection.participantHavingTaskCollection;
  }

  public get personalInfo(): PersonalInfo {
    return this.props.personalInfo;
  }

  private constructor(props: ParticipantProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ParticipantProps, id?: UniqueEntityID): Participant {
    return new Participant(props, id);
  }

  public changeMailAddress(mailAddress: string): Participant {
    this.props.personalInfo.changeMailAddress(mailAddress);
    return this;
  }
  public changeParticipantName(participantName: string): Participant {
    this.props.personalInfo.changeParticipantName(participantName);
    return this;
  }

  public changeEnrolledStatus(status: string): Participant {
    this.props.enrolledStatus = this.props.enrolledStatus.changeEnrolledStatus(status);
    return this;
  }

  public changeProgressStatus(task: Task, status: string): Participant {
    const result = this.props.participantHavingTaskCollection.changeStatus(task, status);
    this.props.participantHavingTaskCollection = result;
    return this;
  }
  public getStatusFromTask(task: Task): string {
    return this.props.participantHavingTaskCollection.getStatusFromTask(task).progressStatus;
  }
  public deleteByTask(deleteTargets: Task[]): void {
    this.props.participantHavingTaskCollection.deleteByTask(deleteTargets);
  }
}
