import { Entity } from '../shared/Entity';
import { UniqueEntityID } from '../shared/UniqueEntityID';
import { EnrolledStatus } from './enrolledStatus';

import { PersonalInfo } from './personalInfo';
import { ParticipantHavingTasks } from './participantHavingTasks';

export interface ParticipantProps {
  personalInfo: PersonalInfo;
  enrolledStatus: EnrolledStatus;
  participantHavingTasks: ParticipantHavingTasks;
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
