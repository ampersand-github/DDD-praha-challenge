import { Participant } from '@/domain/participant/participant';
import { UniqueEntityID } from '@/domain/shared/uniqueEntityID';
import { EnrolledStatus } from '@/domain/participant/enrolledStatus';
import { ParticipantName } from '@/domain/participant/participantName';
import { MailAddress } from '@/domain/participant/mailAddress';
import { PersonalInfo } from '@/domain/participant/personalInfo';
import {
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
  Task as PrismaTask,
} from '@prisma/client';
import { IFromPrismaHavingTaskCollectionConverter } from './ToHavingTaskCollectionConverter';
import { IFromPrismaToTaskConverter } from './ToTaskConverter';

type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

export interface IFromPrismaToParticipant {
  do(data: PrismaParticipantProps, allPrismaTask: PrismaTask[]): Participant;
}

export class ToParticipantConverter implements IFromPrismaToParticipant {
  private readonly toHavingTaskCollection: IFromPrismaHavingTaskCollectionConverter;
  private readonly toTask: IFromPrismaToTaskConverter;

  public constructor(
    toTask: IFromPrismaToTaskConverter,
    toHavingTaskCollection: IFromPrismaHavingTaskCollectionConverter,
  ) {
    this.toHavingTaskCollection = toHavingTaskCollection;
    this.toTask = toTask;
  }

  public do(data: PrismaParticipantProps, allPrismaTask: PrismaTask[]): Participant {
    const id = new UniqueEntityID(data.participantId);
    const enrolledStatus = EnrolledStatus.create({ enrolledStatus: data.enrolledParticipant });
    const participantName = ParticipantName.create({ participantName: data.personalInfo.name });
    const mailAddress = MailAddress.create({ mailAddress: data.personalInfo.mailAddress });
    const personalInfo = PersonalInfo.create({
      participantName: participantName,
      mailAddress: mailAddress,
    });

    return Participant.create(
      {
        personalInfo: personalInfo,
        enrolledStatus: enrolledStatus,
        participantHavingTaskCollection: this.toHavingTaskCollection.do(
          data.participantHavingTask,
          allPrismaTask,
        ),
      },
      id,
    );
  }
}
