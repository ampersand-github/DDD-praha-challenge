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

  public changeMailAddress(mailAddress: string): void {
    this.props.personalInfo = this.personalInfo.changeMailAddress(mailAddress);
  }

  public changeParticipantName(participantName: string): void {
    this.props.personalInfo = this.personalInfo.changeParticipantName(participantName);
  }

  public changeEnrolledStatus(status: string): void {
    this.props.enrolledStatus = this.props.enrolledStatus.recreateEnrolledStatus(status);
  }

  public changeProgressStatus(task: Task, status: string): void {
    this.props.participantHavingTaskCollection = this.props.participantHavingTaskCollection.recreateProgressStatus(
      task,
      status,
    );
  }

  public getStatusFromTask(task: Task): string {
    return this.props.participantHavingTaskCollection.getStatusFromTask(task).progressStatus;
  }

  public deleteHavingTask(task: Task): void {
    this.props.participantHavingTaskCollection = this.props.participantHavingTaskCollection.deleteHavingTask(
      task,
    );
  }
}
