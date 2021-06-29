import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../../../domain/participant/participant';
import { PersonalInfo } from '../../../domain/participant/personalInfo';
import { EnrolledStatus } from '../../../domain/participant/enrolledStatus';
import { Task } from '../../../domain/task/task';
import { prismaClient } from '../../../util/prisma/prismaClient';
import {
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
  PrismaClient,
} from '@prisma/client';
import { ParticipantHavingTaskCollection } from '../../../domain/participant/participantHavingTaskCollection';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { ParticipantName } from '../../../domain/participant/participantName';
import { MailAddress } from '../../../domain/participant/mailAddress';
import { ParticipantHavingTask } from '../../../domain/participant/participantHavingTask';
import { ProgressStatus } from '../../../domain/participant/progressStatus';
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';

// prismaにおける参加者集約の型
type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

export class ParticipantRepository implements IParticipantRepository {
  private prismaClient: PrismaClient = prismaClient;

  public async create(participant: Participant): Promise<Participant> {
    const personalInfoData = ParticipantRepository.MakePersonalInfoData(participant);
    const participantHavingTaskCollectionData = ParticipantRepository.MakeParticipantHavingTaskCollectionData(
      participant,
    );
    await this.prismaClient.participant.create({
      data: {
        participantId: participant.id.toValue(),
        enrolledParticipant: participant.enrolledStatus,
        personalInfo: { create: personalInfoData },
        participantHavingTask: { create: participantHavingTaskCollectionData },
      },
    });
    return this.findOne(participant.id.toValue());
  }

  public async update(participant: Participant): Promise<Participant> {
    // 参加者保有課題を除く参加者集約をupdate
    await this.prismaClient.participant.update({
      where: {
        participantId: participant.id.toValue(),
      },
      data: {
        enrolledParticipant: participant.enrolledStatus,
        personalInfo: {
          update: {
            name: participant.personalInfo.participantName,
            mailAddress: participant.personalInfo.mailAddress,
          },
        },
      },
    });
    // 参加者保有課題を別途でupdate
    await ParticipantRepository.updateParticipantHavingTaskCollection(participant);

    return await this.findOne(participant.id.toValue());
  }

  public async delete(participant: Participant): Promise<number> {
    const result1 = await prismaClient.personalInfo.deleteMany({
      where: { mailAddress: participant.mailAddress },
    });
    const result2 = await prismaClient.participantHavingTask.deleteMany({
      where: { participantId: participant.id.toValue() },
    });
    const result3 = await prismaClient.participant.deleteMany({
      where: { participantId: participant.id.toValue() },
    });
    return result1.count + result2.count + result3.count;
  }

  public async deleteParticipantHavingTaskByTask(task: Task): Promise<number> {
    const result = await prismaClient.participantHavingTask.deleteMany({
      where: { taskId: task.id.toValue() },
    });
    return result.count;
  }

  public async findAll(): Promise<Participant[]> {
    const findManyParticipant: PrismaParticipantProps[] = await this.prismaClient.participant.findMany(
      {
        include: {
          personalInfo: true,
          participantHavingTask: true,
        },
      },
    );

    return await Promise.all(
      findManyParticipant.map((one: PrismaParticipantProps) =>
        ParticipantRepository.convertToParticipant(one),
      ),
    );
  }

  public async findOne(participantId: string): Promise<Participant> {
    const result: PrismaParticipantProps = await this.prismaClient.participant.findUnique({
      where: { participantId: participantId },
      include: { personalInfo: true, participantHavingTask: true },
    });

    return ParticipantRepository.convertToParticipant(result);
  }

  public async isExistMailAddress(mailAddress: string): Promise<boolean> {
    const count = await prismaClient.personalInfo.count({ where: { mailAddress: mailAddress } });
    return count > 0;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // private
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  private static MakePersonalInfoData(participant: Participant) {
    return {
      name: participant.personalInfo.participantName,
      mailAddress: participant.personalInfo.mailAddress,
    };
  }

  private static MakeParticipantHavingTaskCollectionData(participant: Participant) {
    return participant.participantHavingTaskCollection.map((one) => {
      return {
        participantHavingTaskId: one.id.toValue(),
        taskProgress: one.progressStatus.progressStatus,
        taskId: one.task.id.toValue(),
      };
    });
  }

  private static async findOneTaskByTaskId(id: string): Promise<Task> {
    const taskData = await prismaClient.task.findUnique({ where: { taskId: id } });
    return Task.create(
      {
        no: taskData.taskNo,
        name: taskData.taskName,
        description: taskData.description,
        group: TaskGroup.create({ taskGroup: taskData.taskGroupName }),
      },
      new UniqueEntityID(taskData.taskId),
    );
  }

  private static async convertToParticipant(data: PrismaParticipantProps): Promise<Participant> {
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

  private static async convertToParticipantHavingTaskCollection(
    data: PrismaParticipantHavingTask[],
  ): Promise<ParticipantHavingTaskCollection> {
    // データ作成
    const participantHavingTaskCollectionData: ParticipantHavingTask[] = await Promise.all(
      data.map(async (one: PrismaParticipantHavingTask) => {
        const id = new UniqueEntityID(one.participantHavingTaskId);
        const progressStatus = ProgressStatus.create({ progressStatus: one.taskProgress });
        const task = await ParticipantRepository.findOneTaskByTaskId(one.taskId);
        return ParticipantHavingTask.create({ task: task, progressStatus: progressStatus }, id);
      }),
    );
    // ドメインオブジェクト作成
    return ParticipantHavingTaskCollection.create({
      participantHavingTaskCollection: participantHavingTaskCollectionData,
    });
  }

  private static async getParticipantHavingTaskFromDb(
    participantId: string,
  ): Promise<ParticipantHavingTask[]> {
    const result1 = await prismaClient.participantHavingTask.findMany({
      where: {
        participantId: participantId,
      },
    });
    const result2 = await ParticipantRepository.convertToParticipantHavingTaskCollection(result1);
    return result2.participantHavingTaskCollection;
  }

  private static async shouldUpdateParticipantHavingTaskList(
    newCollection: ParticipantHavingTask[],
    oldCollection: ParticipantHavingTask[],
  ): Promise<ParticipantHavingTask[]> {
    return newCollection.filter((newOne) => {
      const result = this.existInParticipantHavingTaskList(oldCollection, newOne);
      // 差分(更新)がない場合trueになる。更新したいリストを作るのでfalseのリストをつくる
      if (!result) {
        return newOne;
      }
    });
  }

  private static existInParticipantHavingTaskList(
    baseList: ParticipantHavingTask[],
    target: ParticipantHavingTask,
  ) {
    return baseList.some((one) => {
      return one.equals(target);
    });
  }

  private static async updateParticipantHavingTaskCollection(participant: Participant) {
    const id = participant.id.toValue();
    const oldList = await ParticipantRepository.getParticipantHavingTaskFromDb(id);
    const newList = participant.participantHavingTaskCollection;
    const shouldUpdateParticipantHavingTaskList = await ParticipantRepository.shouldUpdateParticipantHavingTaskList(
      oldList,
      newList,
    );

    shouldUpdateParticipantHavingTaskList.map((one) => {
      prismaClient.participantHavingTask.update({
        where: {
          participantHavingTaskId: one.id.toValue(),
        },
        data: {
          taskProgress: one.progressStatus.progressStatus,
        },
      });
    });
  }
}
