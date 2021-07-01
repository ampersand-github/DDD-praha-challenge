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
import { TaskRepository } from './taskRepository';

// prismaにおける参加者集約の型
type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

export class ParticipantRepository implements IParticipantRepository {
  // todo 引数でわすようにする
  private prismaClient: PrismaClient = prismaClient;
  private taskRepository: TaskRepository = new TaskRepository();

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
    const allTask = await this.findAllTsk();
    await this.updateParticipantHavingTaskCollection(participant, allTask);

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
      findManyParticipant.map((one: PrismaParticipantProps) => this.convertToParticipant(one)),
    );
  }

  public async findOne(participantId: string): Promise<Participant> {
    const result: PrismaParticipantProps = await this.prismaClient.participant.findUnique({
      where: { participantId: participantId },
      include: { personalInfo: true, participantHavingTask: true },
    });
    return await this.convertToParticipant(result);
  }

  public async isExistMailAddress(mailAddress: string): Promise<boolean> {
    const count = await prismaClient.personalInfo.count({ where: { mailAddress: mailAddress } });
    return count > 0;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // private
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  private async findAllTsk(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

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

  private async convertToParticipant(data: PrismaParticipantProps): Promise<Participant> {
    const id = new UniqueEntityID(data.participantId);
    const enrolledStatus = EnrolledStatus.create({ enrolledStatus: data.enrolledParticipant });
    const participantName = ParticipantName.create({ participantName: data.personalInfo.name });
    const mailAddress = MailAddress.create({ mailAddress: data.personalInfo.mailAddress });
    const personalInfo = PersonalInfo.create({
      participantName: participantName,
      mailAddress: mailAddress,
    });
    const allTask = await this.findAllTsk();
    const participantHavingTaskCollection = await ParticipantRepository.convertToParticipantHavingTaskCollection(
      data.participantHavingTask,
      allTask,
    );

    participantHavingTaskCollection.sort();
    return Participant.create(
      {
        personalInfo: personalInfo,
        enrolledStatus: enrolledStatus,
        participantHavingTaskCollection: participantHavingTaskCollection,
      },
      id,
    );
  }

  private async updateParticipantHavingTaskCollection(participant: Participant, allTask: Task[]) {
    const id = participant.id.toValue();
    const oldList = await ParticipantRepository.getParticipantHavingTaskFromDb(id, allTask);
    const newList = participant.participantHavingTaskCollection;
    const shouldUpdateParticipantHavingTaskList = await ParticipantRepository.shouldUpdateParticipantHavingTaskList(
      newList,
      oldList,
    );
    await this.updateParticipantHavingTask(shouldUpdateParticipantHavingTaskList);
  }

  private async updateParticipantHavingTask(
    shouldUpdateParticipantHavingTaskList: ParticipantHavingTask[],
  ) {
    shouldUpdateParticipantHavingTaskList.map(async (one) => {
      await prismaClient.participantHavingTask.update({
        where: {
          participantHavingTaskId: one.id.toValue(),
        },
        data: {
          taskProgress: one.progressStatus.progressStatus,
        },
      });
    });
  }

  private static async getParticipantHavingTaskFromDb(
    participantId: string,
    allTask: Task[],
  ): Promise<ParticipantHavingTask[]> {
    const result1 = await prismaClient.participantHavingTask.findMany({
      where: {
        participantId: participantId,
      },
    });
    const result2 = await ParticipantRepository.convertToParticipantHavingTaskCollection(
      result1,
      allTask,
    );
    return result2.participantHavingTaskCollection;
  }

  private static async convertToParticipantHavingTaskCollection(
    data: PrismaParticipantHavingTask[],
    allTask: Task[],
  ): Promise<ParticipantHavingTaskCollection> {
    const participantHavingTaskCollectionData: ParticipantHavingTask[] = await Promise.all(
      data.map(async (one: PrismaParticipantHavingTask) => {
        const id = new UniqueEntityID(one.participantHavingTaskId);
        const progressStatus = ProgressStatus.create({ progressStatus: one.taskProgress });
        const taskId = new UniqueEntityID(one.taskId);
        const task = allTask.find((one: Task) => one.id.equals(taskId));
        return ParticipantHavingTask.create({ task: task, progressStatus: progressStatus }, id);
      }),
    );
    // ドメインオブジェクト作成
    return ParticipantHavingTaskCollection.create({
      participantHavingTaskCollection: participantHavingTaskCollectionData,
    });
  }

  private static async shouldUpdateParticipantHavingTaskList(
    newCollection: ParticipantHavingTask[],
    oldCollection: ParticipantHavingTask[],
  ): Promise<ParticipantHavingTask[]> {
    return newCollection.filter((newOne) => {
      if (!this.existInParticipantHavingTaskList(oldCollection, newOne)) {
        return newOne;
      }
    });
  }

  private static existInParticipantHavingTaskList(
    baseList: ParticipantHavingTask[],
    target: ParticipantHavingTask,
  ): boolean {
    return baseList.some((one: ParticipantHavingTask) => {
      // エンティティのidで比べてしまうと変更があるかわからないので、entity.equalを使わずに以下のようにする
      return (
        one.task.id.toValue() === target.task.id.toValue() &&
        one.progressStatus.progressStatus === target.progressStatus.progressStatus
      );
    });
  }
}
