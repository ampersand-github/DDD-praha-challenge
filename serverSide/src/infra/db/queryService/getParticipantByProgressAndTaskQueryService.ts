import { PrismaClient } from '@prisma/client';
import { ProgressStatus } from '../../../domain/participant/progressStatus';
import { Participant } from '../../../domain/participant/participant';
import {
  AtLeastOneTask,
  IGetParticipantByProgressAndTaskQueryService,
} from '../../../usecase/queryService/interface/IGetParticipantByProgressAndTaskQueryService';
import { IFromPrismaToTaskConverter } from '../repository/shared/converter/ToTaskConverter';
import { IFromPrismaToParticipant } from '../repository/shared/converter/ToParticipantConverter';
import { IFromPrismaHavingTaskCollectionConverter } from '../repository/shared/converter/ToHavingTaskCollectionConverter';
import { TaskRepository } from '../repository/taskRepository';

export class GetParticipantByProgressAndTaskQueryService
  implements IGetParticipantByProgressAndTaskQueryService {
  private readonly prismaClient: PrismaClient;
  private taskRepository: TaskRepository;
  private readonly toParticipantConverter: IFromPrismaToParticipant;
  private readonly toHavingTaskCollectionConverter: IFromPrismaHavingTaskCollectionConverter;

  public constructor(
    prismaClient: PrismaClient,
    ToTaskConverter: IFromPrismaToTaskConverter,
    toHavingTaskCollectionConverter: IFromPrismaHavingTaskCollectionConverter,
    toParticipantConverter: IFromPrismaToParticipant,
  ) {
    this.prismaClient = prismaClient;
    this.taskRepository = new TaskRepository(prismaClient, ToTaskConverter);
    this.toHavingTaskCollectionConverter = toHavingTaskCollectionConverter;
    this.toParticipantConverter = toParticipantConverter;
  }

  public async do(
    taskList: AtLeastOneTask,
    progressStatus: ProgressStatus,
    take,
    page,
  ): Promise<Participant[]> {
    const skip = take * (page - 1);
    const taskIdList = taskList.map((one) => one.id.toValue());

    /*
   「特定の課題（複数可能）」が「特定の進捗ステータス」になっている参加者の一覧を、○人単位でページングして取得する
    例１：「設計原則（SOLID）」と「DBモデリング１」を「レビュー完了」している参加者一覧を取得する
    例２：「DBモデリング3」を「未着手」の参加者一覧を取得する
     */

    // 上記条件に合致するparticipantIdを取得する
    const matchedParticipantIdList = await this.prismaClient.participantHavingTask.groupBy({
      by: ['participantId'],
      having: { participantId: { _count: { equals: taskIdList.length } } },
      where: {
        taskProgress: progressStatus.progressStatus,
        taskId: { in: taskIdList },
      },
    });

    /*
    ({
      by:
      having: { participantId: { count: { equals: taskIdList.length } } },
      where: {
        taskProgress: progressStatus.progressStatus,
        taskId: { in: taskIdList },
      },
    });
     */
    const matchedParticipantList = await this.prismaClient.participant.findMany({
      where: {
        participantId: {
          in: matchedParticipantIdList.map((one) => one.participantId),
        },
      },
      include: {
        participantHavingTask: true,
        personalInfo: true,
      },
      skip: skip,
      take: take,
      orderBy: { participantId: 'desc' },
    });

    const allPrismaTask = await this.prismaClient.task.findMany();
    return matchedParticipantList.map((one) => this.toParticipantConverter.do(one, allPrismaTask));
  }
}
