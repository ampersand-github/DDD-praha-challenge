import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../../../domain/participant/participant';
import { Task } from '../../../domain/task/task';
import { prismaClient } from '../../../util/prisma/prismaClient';
import {
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
  PrismaClient,
} from '@prisma/client';
import { ParticipantHavingTask } from '../../../domain/participant/participantHavingTask';
import { TaskRepository } from './taskRepository';
import { Converter } from './shared/converter';

// prismaにおける参加者集約の型
type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

export class ParticipantRepository implements IParticipantRepository {
  private taskRepository: TaskRepository;
  private readonly prismaClient: PrismaClient;
  private readonly converter: Converter;

  public constructor(prismaClient: PrismaClient, converter: Converter) {
    this.prismaClient = prismaClient;
    this.taskRepository = new TaskRepository(prismaClient, converter);
    this.converter = converter;
  }

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
    await this.updateParticipantHavingTaskCollection(participant, allTask, this.converter);

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

  // DBにある参加者保有課題からドメインオブジェクトの参加者保有課題を引いて残った参加者保有課題を削除する
  public async deleteHavingTaskByDifferenceFromDb(participant: Participant): Promise<void> {
    const id = participant.id.toValue();
    const allTask = await this.findAllTsk();
    const fromTable = await ParticipantRepository.getParticipantHavingTaskFromDb(
      id,
      allTask,
      this.converter,
    );
    const deleteTargetList = await ParticipantRepository.havingTaskDifferenceList(
      fromTable,
      participant.participantHavingTaskCollection,
    );

    if (deleteTargetList.length === 0) {
      console.log('削除すべき参加者保有課題が存在しない');
    }

    await Promise.all(
      deleteTargetList.map(async (one: ParticipantHavingTask) => {
        await prismaClient.participantHavingTask.delete({
          where: {
            participantId_taskId: {
              participantId: participant.id.toValue(),
              taskId: one.task.id.toValue(),
            },
          },
        });
      }),
    );
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
      findManyParticipant.map((one: PrismaParticipantProps) => this.converter.toParticipant(one)),
    );
  }

  public async findOne(participantId: string): Promise<Participant> {
    const result: PrismaParticipantProps = await this.prismaClient.participant.findUnique({
      where: { participantId: participantId },
      include: { personalInfo: true, participantHavingTask: true },
    });
    return await this.converter.toParticipant(result);
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
        taskProgress: one.progressStatus.progressStatus,
        taskId: one.task.id.toValue(),
      };
    });
  }

  private async updateParticipantHavingTaskCollection(
    participant: Participant,
    allTask: Task[],
    converter: Converter,
  ) {
    const id = participant.id.toValue();
    const oldList = await ParticipantRepository.getParticipantHavingTaskFromDb(
      id,
      allTask,
      converter,
    );
    const newList = participant.participantHavingTaskCollection;
    const shouldUpdateParticipantHavingTaskList = await ParticipantRepository.havingTaskDifferenceList(
      newList,
      oldList,
    );
    await this.updateParticipantHavingTask(shouldUpdateParticipantHavingTaskList, id);
  }

  private async updateParticipantHavingTask(
    shouldUpdateParticipantHavingTaskList: ParticipantHavingTask[],
    participantId: string,
  ) {
    shouldUpdateParticipantHavingTaskList.map(async (one) => {
      await prismaClient.participantHavingTask.update({
        where: {
          participantId_taskId: {
            taskId: one.task.id.toValue(),
            participantId: participantId,
          },
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
    converter: Converter,
  ): Promise<ParticipantHavingTask[]> {
    const findManyParticipantHavingTask = await prismaClient.participantHavingTask.findMany({
      where: {
        participantId: participantId,
      },
    });
    const participantHavingTaskCollection = await converter.toParticipantHavingTaskCollection(
      findManyParticipantHavingTask,
    );
    return participantHavingTaskCollection.participantHavingTaskCollection;
  }

  private static async havingTaskDifferenceList(
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
      return one.equals(target);
    });
  }
}
