import {
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
  Task as PrismaTaskProps,
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
import { prismaClient } from '../../../../util/prisma/prismaClient';

export interface IConverter {
  convertToTask(data: PrismaTaskProps): Task;
  /*
  convertToParticipant(data: PrismaParticipantProps): Promise<Participant>;
  convertToParticipantHavingTaskCollection(
    data: PrismaParticipantHavingTask[],
  ): Promise<ParticipantHavingTaskCollection>;
  convertToPair(data: PrismaTaskProps): Task;

 */
}
type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

export class Converter implements IConverter {
  // todo これあとで考える
  private async getAllTaskList(): Promise<Task[]> {
    const aaa = await prismaClient.task.findMany();
    const aaaaaa = await aaa.map((one) => {
      return this.convertToTask(one);
    });
    return aaaaaa;
  }

  public convertToTask(data: PrismaTaskProps): Task {
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

  /*
  private async convertToParticipantHavingTaskCollection(
    data: PrismaParticipantHavingTask[],
  ): Promise<ParticipantHavingTaskCollection> {
    // todo あとでチョスエイ
    const aaa: Task[] = await this.getAllTaskList();

    const participantHavingTaskCollectionData: ParticipantHavingTask[] = await Promise.all(
      data.map(async (one: PrismaParticipantHavingTask) => {
        const progressStatus = ProgressStatus.create({ progressStatus: one.taskProgress });
        const taskId = new UniqueEntityID(one.taskId);
        const task = aaa.find((one: Task) => one.id.equals(taskId));
        return ParticipantHavingTask.create({ task: task, progressStatus: progressStatus });
      }),
    );
    return ParticipantHavingTaskCollection.create({
      participantHavingTaskCollection: participantHavingTaskCollectionData,
    });
  }

  private async convertToParticipant(data: PrismaParticipantProps): Promise<Participant> {
    const id = new UniqueEntityID(data.participantId);
    const enrolledStatus = EnrolledStatus.create({ enrolledStatus: data.enrolledParticipant });
    const participantName = ParticipantName.create({ participantName: data.personalInfo.name });
    const mailAddress = MailAddress.create({ mailAddress: data.personalInfo.mailAddress });
    const personalInfo = PersonalInfo.create({
      participantName: participantName,
      mailAddress: mailAddress,
    });
    const participantHavingTaskCollection = await this.convertToParticipantHavingTaskCollection(
      data.participantHavingTask,
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

  public convertToPair(data: PrismaTaskProps): Task {
    return undefined;
  }
 */
}
