import { Entity } from '@/domain/shared/entity';
import { UniqueEntityID } from '@/domain/shared/uniqueEntityID';
import { EnrolledStatus } from '@/domain/participant/enrolledStatus';
import { PersonalInfo } from '@/domain/participant/personalInfo';
import { Task } from '@/domain/task/task';
import { ParticipantHavingTaskCollection } from '@/domain/participant/participantHavingTaskCollection';
import { ParticipantHavingTask } from '@/domain/participant/participantHavingTask';

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
    this.props.enrolledStatus = EnrolledStatus.create({ enrolledStatus: status });
  }

  public changeProgressStatus(task: Task, status: string): void {
    this.props.participantHavingTaskCollection =
      this.props.participantHavingTaskCollection.changeProgressStatus(task, status);
  }

  public getStatusFromTask(task: Task): string {
    return this.props.participantHavingTaskCollection.getStatusFromTask(task).progressStatus;
  }

  public deleteHavingTask(task: Task): void {
    this.props.participantHavingTaskCollection =
      this.props.participantHavingTaskCollection.deleteHavingTask(task);
  }
}
