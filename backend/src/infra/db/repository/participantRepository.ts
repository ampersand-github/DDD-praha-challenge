import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../../../domain/participant/participant';
import { Task } from '../../../domain/task/task';
import {
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
} from '@prisma/client';
import { ParticipantHavingTask } from '../../../domain/participant/participantHavingTask';
import { TaskRepository } from './taskRepository';
import { PrismaClient } from '@prisma/client/scripts/default-index';
import { IFromPrismaToParticipant } from './shared/converter/ToParticipantConverter';
import { IFromPrismaToTaskConverter } from './shared/converter/ToTaskConverter';
import { IFromPrismaHavingTaskCollectionConverter } from './shared/converter/ToHavingTaskCollectionConverter';

// prismaにおける参加者集約の型
type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

export class ParticipantRepository implements IParticipantRepository {
  private taskRepository: TaskRepository;
  private readonly prismaClient: PrismaClient;
  private readonly toParticipantConverter: IFromPrismaToParticipant;
  private readonly toHavingTaskCollectionConverter: IFromPrismaHavingTaskCollectionConverter;

  public constructor(
    prismaClient: PrismaClient,
    ToTaskConverter: IFromPrismaToTaskConverter,
    toParticipantConverter: IFromPrismaToParticipant,
    toHavingTaskCollectionConverter: IFromPrismaHavingTaskCollectionConverter,
  ) {
    this.prismaClient = prismaClient;
    this.taskRepository = new TaskRepository(prismaClient, ToTaskConverter);
    this.toParticipantConverter = toParticipantConverter;
    this.toHavingTaskCollectionConverter = toHavingTaskCollectionConverter;
  }

  public async create(participant: Participant): Promise<Participant> {
    const personalInfoData = ParticipantRepository.MakePersonalInfoData(participant);
    const participantHavingTaskCollectionData =
      ParticipantRepository.MakeParticipantHavingTaskCollectionData(participant);
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
    // 差分がある場合、更新もしくは削除する
    await this.diffUpdateParticipantHavingTaskCollection(participant);
    await this.diffDeleteParticipantHavingTaskCollection(participant);
    return await this.findOne(participant.id.toValue());
  }

  public async delete(participant: Participant): Promise<number> {
    const result1 = await this.prismaClient.personalInfo.deleteMany({
      where: { mailAddress: participant.mailAddress },
    });
    const result2 = await this.prismaClient.participantHavingTask.deleteMany({
      where: { participantId: participant.id.toValue() },
    });
    const result3 = await this.prismaClient.participant.deleteMany({
      where: { participantId: participant.id.toValue() },
    });
    return result1.count + result2.count + result3.count;
  }

  public async deleteParticipantHavingTaskByTask(task: Task): Promise<number> {
    const result = await this.prismaClient.participantHavingTask.deleteMany({
      where: { taskId: task.id.toValue() },
    });
    return result.count;
  }

  public async findAll(): Promise<Participant[]> {
    const findManyParticipant: PrismaParticipantProps[] =
      await this.prismaClient.participant.findMany({
        include: {
          personalInfo: true,
          participantHavingTask: true,
        },
      });
    const allPrismaTask = await this.getAllPrismaTask();
    return await Promise.all(
      findManyParticipant.map((one: PrismaParticipantProps) =>
        this.toParticipantConverter.do(one, allPrismaTask),
      ),
    );
  }

  public async findOne(participantId: string): Promise<Participant> {
    const result: PrismaParticipantProps = await this.prismaClient.participant.findUnique({
      where: { participantId: participantId },
      include: { personalInfo: true, participantHavingTask: true },
    });
    const allPrismaTask = await this.getAllPrismaTask();
    return this.toParticipantConverter.do(result, allPrismaTask);
  }

  public async isExistMailAddress(mailAddress: string): Promise<boolean> {
    const count = await this.prismaClient.personalInfo.count({
      where: { mailAddress: mailAddress },
    });
    return count > 0;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // private
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  private async getAllPrismaTask() {
    return await this.prismaClient.task.findMany();
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
  private async diffUpdateParticipantHavingTaskCollection(participant: Participant) {
    const id = participant.id.toValue();
    const fromTable = await this.getParticipantHavingTaskFromDb(id);
    const shouldUpdateList = await ParticipantRepository.havingTaskDifferenceList(
      participant.participantHavingTaskCollection,
      fromTable,
    );
    if (shouldUpdateList.length > 0) {
      await this.updateParticipantHavingTask(shouldUpdateList, id);
    }
  }
  private async diffDeleteParticipantHavingTaskCollection(participant: Participant) {
    const id = participant.id.toValue();
    const fromTable = await this.getParticipantHavingTaskFromDb(id);

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
      await this.prismaClient.participantHavingTask.update({
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
        await this.prismaClient.participantHavingTask.delete({
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

  private async getParticipantHavingTaskFromDb(
    participantId: string,
  ): Promise<ParticipantHavingTask[]> {
    const findManyParticipantHavingTask = await this.prismaClient.participantHavingTask.findMany({
      where: {
        participantId: participantId,
      },
    });
    const allPrismaTask = await this.prismaClient.task.findMany();
    const participantHavingTaskCollection = await this.toHavingTaskCollectionConverter.do(
      findManyParticipantHavingTask,
      allPrismaTask,
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
