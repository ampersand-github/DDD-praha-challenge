import {
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
  PrismaClient,
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

export interface IConverter {
  toTask(data: PrismaTaskProps): Task;
  toParticipantHavingTaskCollection(
    data: PrismaParticipantHavingTask[],
  ): Promise<ParticipantHavingTaskCollection>;
  toParticipant(data: PrismaParticipantProps): Promise<Participant>;
  /*
  convertToPair(data: PrismaTaskProps): Task;
 */
}
type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

export class Converter implements IConverter {
  private readonly prismaClient: PrismaClient;

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private async getAllTaskList(): Promise<Task[]> {
    const manyTask = await this.prismaClient.task.findMany();
    return await manyTask.map((one) => {
      return this.toTask(one);
    });
  }

  public toTask(data: PrismaTaskProps): Task {
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

  public async toParticipantHavingTaskCollection(
    data: PrismaParticipantHavingTask[],
  ): Promise<ParticipantHavingTaskCollection> {
    const allTask = await this.getAllTaskList();
    const participantHavingTaskCollectionData: ParticipantHavingTask[] = await Promise.all(
      data.map(async (one: PrismaParticipantHavingTask) => {
        const progressStatus = ProgressStatus.create({ progressStatus: one.taskProgress });
        const taskId = new UniqueEntityID(one.taskId);
        const task = allTask.find((one: Task) => one.id.equals(taskId));
        return ParticipantHavingTask.create({ task: task, progressStatus: progressStatus });
      }),
    );
    return ParticipantHavingTaskCollection.create({
      participantHavingTaskCollection: participantHavingTaskCollectionData,
    });
  }

  public async toParticipant(data: PrismaParticipantProps): Promise<Participant> {
    const id = new UniqueEntityID(data.participantId);
    const enrolledStatus = EnrolledStatus.create({ enrolledStatus: data.enrolledParticipant });
    const participantName = ParticipantName.create({ participantName: data.personalInfo.name });
    const mailAddress = MailAddress.create({ mailAddress: data.personalInfo.mailAddress });
    const personalInfo = PersonalInfo.create({
      participantName: participantName,
      mailAddress: mailAddress,
    });
    const participantHavingTaskCollection = await this.toParticipantHavingTaskCollection(
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
}
