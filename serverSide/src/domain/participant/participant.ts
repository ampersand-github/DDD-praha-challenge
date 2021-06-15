import { Entity } from '../shared/Entity';
import { UniqueEntityID } from '../shared/UniqueEntityID';
import { EnrolledStatus } from './enrolledStatus';

import { PersonalInfo } from './personalInfo';
import { ParticipantHavingTasks } from './participantHavingTasks';
import { Task } from '../task/task';

export interface ParticipantProps {
  personalInfo: PersonalInfo;
  enrolledStatus: EnrolledStatus;
  participantHavingTasks: ParticipantHavingTasks;
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
  public get participantHavingTasks(): ParticipantHavingTasks {
    return this.props.participantHavingTasks;
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
    const result = this.props.participantHavingTasks.changeStatus(task, status);
    this.props.participantHavingTasks = result;
    return this;
  }
}
