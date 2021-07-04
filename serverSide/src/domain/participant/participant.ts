import { Entity } from '../shared/Entity';
import { UniqueEntityID } from '../shared/UniqueEntityID';
import { EnrolledStatus } from './enrolledStatus';
import { PersonalInfo } from './personalInfo';
import { Task } from '../task/task';
import { ParticipantHavingTaskCollection } from './participantHavingTaskCollection';
import { ParticipantHavingTask } from './participantHavingTask';
import { ParticipantName } from './participantName';
import { MailAddress } from './mailAddress';

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
    const mail = MailAddress.create({ mailAddress: mailAddress });
    const participant = ParticipantName.create({
      participantName: this.props.personalInfo.participantName,
    });
    this.props.personalInfo = PersonalInfo.create({
      mailAddress: mail,
      participantName: participant,
    });
    return this;
  }

  public changeParticipantName(participantName: string): Participant {
    const mailAddress = MailAddress.create({ mailAddress: this.props.personalInfo.mailAddress });
    const participant = ParticipantName.create({ participantName: participantName });
    this.props.personalInfo = PersonalInfo.create({
      mailAddress: mailAddress,
      participantName: participant,
    });
    return this;
  }

  public changeEnrolledStatus(status: string): Participant {
    this.props.enrolledStatus = EnrolledStatus.create({ enrolledStatus: status });
    return this;
  }

  public changeProgressStatus(task: Task, status: string): Participant {
    const result = this.props.participantHavingTaskCollection.changeProgressStatus(task, status);
    this.props.participantHavingTaskCollection = result;
    return this;
  }

  // todo ここで値オブジェクトを作って返す
  public getStatusFromTask(task: Task): string {
    return this.props.participantHavingTaskCollection.getStatusFromTask(task).progressStatus;
  }
}
