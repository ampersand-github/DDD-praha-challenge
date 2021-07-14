import {
  Pair as PrismaPair,
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
  PrismaClient,
  Task as PrismaTask,
} from '@prisma/client';
import { Task } from '../../../../domain/task/task';
import { UniqueEntityID } from '../../../../domain/shared/UniqueEntityID';
import { TaskGroup, taskGroupType } from '../../../../domain/taskGroup/taskGroup';
import { Participant } from '../../../../domain/participant/participant';
import { EnrolledStatus } from '../../../../domain/participant/enrolledStatus';
import { ParticipantName } from '../../../../domain/participant/participantName';
import { MailAddress } from '../../../../domain/participant/mailAddress';
import { PersonalInfo } from '../../../../domain/participant/personalInfo';
import { ParticipantHavingTaskCollection } from '../../../../domain/participant/participantHavingTaskCollection';
import { ParticipantHavingTask } from '../../../../domain/participant/participantHavingTask';
import { ProgressStatus } from '../../../../domain/participant/progressStatus';
import { Pair } from '../../../../domain/pair/pair';
import { PairName } from '../../../../domain/pair/pairName';

export interface IConverter {
  toTask(data: PrismaTask): Task;
  toHavingTaskCollection(
    data: PrismaParticipantHavingTask[],
    prismaAllTask: PrismaTask[],
  ): ParticipantHavingTaskCollection;
  toParticipant(data: PrismaParticipantProps, prismaAllTask: PrismaTask[]): Participant;
  toPair(data: PrismaPairProps, prismaAllTask: PrismaTask[]): Pair;
}

type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

type PrismaPairProps = PrismaPair & {
  participants: PrismaParticipantProps[];
};

// todo 分割するか考える
export class Converter implements IConverter {
  public toTask(data: PrismaTask): Task {
    const taskId = new UniqueEntityID(data.taskId);
    const taskData = {
      no: data.taskNo,
      name: data.taskName,
      description: data.description,
      group: TaskGroup.create({
        taskGroup: data.taskGroupName as taskGroupType,
      }),
    };
    return Task.create(taskData, taskId);
  }

  public toHavingTaskCollection(
    data: PrismaParticipantHavingTask[],
    prismaAllTask: PrismaTask[],
  ): ParticipantHavingTaskCollection {
    const allTask = prismaAllTask.map((one) => this.toTask(one));
    const participantHavingTaskCollectionData: ParticipantHavingTask[] = data.map(
      (one: PrismaParticipantHavingTask) => {
        const progressStatus = ProgressStatus.create({ progressStatus: one.taskProgress });
        const taskId = new UniqueEntityID(one.taskId);
        const task = allTask.find((one: Task) => one.id.equals(taskId));
        return ParticipantHavingTask.create({ task: task, progressStatus: progressStatus });
      },
    );
    return ParticipantHavingTaskCollection.create({
      participantHavingTaskCollection: participantHavingTaskCollectionData,
    });
  }

  public toParticipant(data: PrismaParticipantProps, prismaAllTask: PrismaTask[]): Participant {
    const id = new UniqueEntityID(data.participantId);
    const enrolledStatus = EnrolledStatus.create({ enrolledStatus: data.enrolledParticipant });
    const participantName = ParticipantName.create({ participantName: data.personalInfo.name });
    const mailAddress = MailAddress.create({ mailAddress: data.personalInfo.mailAddress });
    const personalInfo = PersonalInfo.create({
      participantName: participantName,
      mailAddress: mailAddress,
    });
    const participantHavingTaskCollection = this.toHavingTaskCollection(
      data.participantHavingTask,
      prismaAllTask,
    );

    return Participant.create(
      {
        personalInfo: personalInfo,
        enrolledStatus: enrolledStatus,
        participantHavingTaskCollection: participantHavingTaskCollection,
      },
      id,
    );
  }

  public toPair(data: PrismaPairProps, prismaAllTask: PrismaTask[]): Pair {
    const id = new UniqueEntityID(data.pairId);
    const pairName = PairName.create({ pairName: data.pairName });
    const participants = data.participants.map((one) => this.toParticipant(one, prismaAllTask));
    return Pair.create({ pairName: pairName, participants: participants }, id);
  }
}
