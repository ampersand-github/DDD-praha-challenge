import { IConverter } from '../repository/shared/converter';
import { PrismaClient } from '@prisma/client';
import { ProgressStatus } from '../../../domain/participant/progressStatus';
import { Participant } from '../../../domain/participant/participant';
import {
  AtLeast1Task,
  IGetParticipantByProgressAndTaskQueryService,
} from '../../../usecase/queryService/GetParticipantByProgressAndTaskQueryService';

export class GetParticipantByProgressAndTaskQueryService
  implements IGetParticipantByProgressAndTaskQueryService {
  private readonly prismaClient: PrismaClient;
  private readonly converter: IConverter;

  public constructor(prismaClient: PrismaClient, converter: IConverter) {
    this.prismaClient = prismaClient;
    this.converter = converter;
  }

  public async do(
    taskList: AtLeast1Task,
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
      having: { participantId: { count: { equals: taskIdList.length } } },
      where: {
        taskProgress: progressStatus.progressStatus,
        taskId: { in: taskIdList },
      },
    });

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
    return matchedParticipantList.map((one) => this.converter.toParticipant(one, allPrismaTask));
  }
}
