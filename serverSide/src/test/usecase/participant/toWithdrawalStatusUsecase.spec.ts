import { EnrolledStatusDTO } from '../../../usecase/participant/DTO/enrolledStatusDTO';
import {
  dummyParticipant1,
  dummyParticipant3,
  dummyParticipant4,
  dummyParticipant5,
  dummyParticipant6,
  dummyParticipant7,
  dummyParticipant8,
  dummyParticipant9,
} from '../../../testUtil/dummy/dummyPerticipant';
import { ToWithdrawalStatusUsecase } from '../../../usecase/participant/toWithdrawalStatusUsecase';
import { prismaClient } from '../../../util/prisma/prismaClient';
import { Converter } from '../../../infra/db/repository/shared/converter';
import { TaskRepository } from '../../../infra/db/repository/taskRepository';
import { ParticipantRepository } from '../../../infra/db/repository/participantRepository';
import { PairRepository } from '../../../infra/db/repository/pairRepository';
import { DistributeOneParticipantForAnotherPairDomainService } from '../../../domain/pair/domainService/distributeOneParticipantDomainService';
import { RemoveParticipantInPairUsecase } from '../../../usecase/pair/removeParticipantInPairUsecase';
import { truncateAllTable } from '../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../testUtil/dummy/dummyTask';
import { dummyPair2, dummyPair3, dummyPair4 } from '../../../testUtil/dummy/dummyPair';
import { EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';

describe('ToWithdrawalStatusUsecase', (): void => {
  const prisma = prismaClient;
  const converter: Converter = new Converter();
  const taskRepository = new TaskRepository(prisma, converter);
  const participantRepository = new ParticipantRepository(prisma, converter);
  const pairRepository = new PairRepository(prisma, converter);

  const service = new DistributeOneParticipantForAnotherPairDomainService(pairRepository);
  const removeUsecase = new RemoveParticipantInPairUsecase(pairRepository, service);
  const toRecessStatusUsecase = new ToWithdrawalStatusUsecase(
    participantRepository,
    pairRepository,
    removeUsecase,
  );

  beforeAll(async () => {
    await truncateAllTable();
  });

  beforeEach(async () => {
    await prisma.personalInfo.deleteMany();
    await prisma.participantHavingTask.deleteMany();
    await prisma.task.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.pair.deleteMany();
    await taskRepository.create(dummyTask1);
    await taskRepository.create(dummyTask2);
    await taskRepository.create(dummyTask3);
    await participantRepository.create(dummyParticipant1);
    await participantRepository.create(dummyParticipant3);
    await participantRepository.create(dummyParticipant4);
    await participantRepository.create(dummyParticipant5);
    await participantRepository.create(dummyParticipant6);
    await participantRepository.create(dummyParticipant7);
    await participantRepository.create(dummyParticipant8);
    await participantRepository.create(dummyParticipant9);
    await pairRepository.create(dummyPair2);
    await pairRepository.create(dummyPair3);
    await pairRepository.create(dummyPair4);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('do', (): void => {
    test('[正常]３人ペアのうち１人の在籍ステータスを退会中に変更できる', async () => {
      // ターゲット
      const targetPairName = dummyPair3.pairName;
      const targetParticipantId = dummyPair3.participants[0].id.toValue();

      // before
      // ペアに３人いる
      await expect(nowParticipantCount(targetPairName)).resolves.toEqual(3);
      // ターゲットの参加者は在籍中
      await expect(nowStatus(targetParticipantId)).resolves.toEqual(EnrolledStatusEnum.enrolled);
      // ターゲットがペアに所属している
      await expect(nowPairName(targetParticipantId)).resolves.toEqual(targetPairName);

      // 処理
      const result = await toRecessStatusUsecase.do({ participantId: targetParticipantId });
      await expect(result).toBeInstanceOf(EnrolledStatusDTO);

      // after
      // ペアが２人になっている(退会中の参加者はペアに所属できないので)
      await expect(nowParticipantCount(targetPairName)).resolves.toEqual(2);
      // ターゲットの参加者は退会中になっている
      await expect(nowStatus(targetParticipantId)).resolves.toEqual(EnrolledStatusEnum.withdrawal);
      // ターゲットがペアに所属していない
      await expect(nowPairName(targetParticipantId)).resolves.toEqual(null);
    });

    test('[正常]2人ペアのうち一人を在籍ステータスを退会中に変更できる', async () => {
      // ターゲット
      const targetPairName = dummyPair4.pairName;
      const targetParticipantId = dummyPair4.participants[0].id.toValue(); // 休会中になる
      const otherParticipantId = dummyPair4.participants[1].id.toValue(); // 別のペアに移動になる

      // before
      // ペアに2人いる
      await expect(nowParticipantCount(targetPairName)).resolves.toEqual(2);
      // ターゲットの参加者は在籍中
      await expect(nowStatus(targetParticipantId)).resolves.toEqual(EnrolledStatusEnum.enrolled);
      // ターゲットがペアに所属している
      await expect(nowPairName(targetParticipantId)).resolves.toEqual(targetPairName);

      // 処理
      const result = await toRecessStatusUsecase.do({ participantId: targetParticipantId });
      await expect(result).toBeInstanceOf(EnrolledStatusDTO);

      // after
      // ターゲットの参加者は退会中になっている
      await expect(nowStatus(targetParticipantId)).resolves.toEqual(EnrolledStatusEnum.withdrawal);
      // ターゲットが所属していたペアは削除されて存在しない。
      await expect(nowPairName(targetParticipantId)).resolves.toEqual(null);
      // 残りの参加者は別のペアに移籍している
      const pairName = await prisma.participant.findUnique({
        where: { participantId: otherParticipantId },
      });
      await expect(pairName.pairName).not.toBe('a');
    });

    const nowStatus = async (id: string) => {
      const result = await prisma.participant.findUnique({
        where: {
          participantId: id,
        },
      });
      return result.enrolledParticipant;
    };
    const nowParticipantCount = async (pairName: string) => {
      return await prisma.participant.count({
        where: {
          pairName: pairName,
        },
      });
    };

    const nowPairName = async (participantId: string) => {
      const result = await prisma.participant.findUnique({
        where: { participantId: participantId },
      });
      return result.pairName;
    };
  });
});
