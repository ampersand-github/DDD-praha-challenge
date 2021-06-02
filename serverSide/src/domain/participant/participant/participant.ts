import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { EnrolledStatus } from './enrolledStatus';
import { ParticipantHavingTask } from './participantHavingTask';
import { PersonalInfo } from './personalInfo';

export interface ParticipantProps {
  personalInfo: PersonalInfo;
  enrolledStatus: EnrolledStatus;
  participantHavingTask: ParticipantHavingTask;
}

export class Participant extends Entity<ParticipantProps> {
  public get enrolledStatus() {
    return this.props.enrolledStatus;
  }

  private constructor(props: ParticipantProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ParticipantProps,
    id?: UniqueEntityID,
  ): Participant {
    return new Participant(props, id);
  }
  // todo 必須じゃないので余裕のある時に作る
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // public changeParticipantName(): void {}
  // todo 必須じゃないので余裕のある時に作る
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // public changeMailAddress(): void {}
  // todo ステータス変更の色々を作り込む
  public changeEnrolledStatus(status): void {
    this.props.enrolledStatus = status;
  }
}
