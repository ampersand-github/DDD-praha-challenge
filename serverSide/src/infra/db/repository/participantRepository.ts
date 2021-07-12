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
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';

// prismaにおける参加者集約の型
type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

export class ParticipantRepository implements IParticipantRepository {
  private taskRepository: TaskRepository;
  private readonly prismaClient: PrismaClient;

  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
    this.taskRepository = new TaskRepository(prismaClient);
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
    // 差分がある場合、更新もしくは削除する
    await this.diffUpdateParticipantHavingTaskCollection(participant, allTask, this.converter);
    await this.diffDeleteParticipantHavingTaskCollection(participant, allTask, this.converter);
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
        taskProgress: one.progressStatus.progressStatus,
        taskId: one.task.id.toValue(),
      };
    });
  }

  // ★
  private async diffUpdateParticipantHavingTaskCollection(
    participant: Participant,
    allTask: Task[],
    converter: IConverter,
  ) {
    const id = participant.id.toValue();
    const fromTable = await ParticipantRepository.getParticipantHavingTaskFromDb(
      id,
      allTask,
    );
    const shouldUpdateList = await ParticipantRepository.havingTaskDifferenceList(
      participant.participantHavingTaskCollection,
      fromTable,
    );
    if (shouldUpdateList.length > 0) {
      await this.updateParticipantHavingTask(shouldUpdateList, id);
    }
  }
  private async diffDeleteParticipantHavingTaskCollection(
    participant: Participant,
    allTask: Task[],
    converter: IConverter,
  ) {
    const id = participant.id.toValue();
    const fromTable = await ParticipantRepository.getParticipantHavingTaskFromDb(
      id,
      allTask,
      converter,
    );

    const deleteTargetList = await ParticipantRepository.havingTaskDifferenceList(
      fromTable,
      participant.participantHavingTaskCollection,
    );

    if (deleteTargetList.length > 0) {
      await this.deleteParticipantHavingTask(deleteTargetList, id);
    }
  }

  private async updateParticipantHavingTask(
    shouldUpdateParticipantHavingTaskList: ParticipantHavingTask[],
    participantId: string,
  ): Promise<void> {
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

  private async deleteParticipantHavingTask(
    shouldDeleteParticipantHavingTaskList: ParticipantHavingTask[],
    participantId: string,
  ): Promise<void> {
    await Promise.all(
      shouldDeleteParticipantHavingTaskList.map(async (one: ParticipantHavingTask) => {
        await prismaClient.participantHavingTask.delete({
          where: {
            participantId_taskId: {
              participantId: participantId,
              taskId: one.task.id.toValue(),
            },
          },
        });
      }),
    );
  }

  private static async getParticipantHavingTaskFromDb(
    participantId: string,
    allTask: Task[],
  ): Promise<ParticipantHavingTask[]> {
    const findManyParticipantHavingTask = await prismaClient.participantHavingTask.findMany({
      where: {
        participantId: participantId,
      },
    });
    const participantHavingTaskCollection = await ParticipantRepository.convertToParticipantHavingTaskCollection(
      findManyParticipantHavingTask,
      allTask,
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
