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
import { ToRecessStatusUsecase } from '../../../usecase/participant/toRecessStatusUsecase';
import { DistributeOneParticipantForAnotherPairDomainService } from '../../../domain/pair/domainService/distributeOneParticipantDomainService';
import { RemoveParticipantInPairUsecase } from '../../../usecase/pair/removeParticipantInPairUsecase';
import { truncateAllTable } from '../../../testUtil/reposiotry/truncateAllTable';
import { prismaClient } from '../../../util/prisma/prismaClient';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../testUtil/dummy/dummyTask';
import { dummyPair2, dummyPair3, dummyPair4 } from '../../../testUtil/dummy/dummyPair';
import { TaskRepository } from '../../../infra/db/repository/taskRepository';
import { ParticipantRepository } from '../../../infra/db/repository/participantRepository';
import { PairRepository } from '../../../infra/db/repository/pairRepository';
import { EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';
import { ToTaskConverter } from '../../../infra/db/repository/shared/converter/ToTaskConverter';
import { ToHavingTaskCollectionConverter } from '../../../infra/db/repository/shared/converter/ToHavingTaskCollectionConverter';
import { ToParticipantConverter } from '../../../infra/db/repository/shared/converter/ToParticipantConverter';
import { ToPairConverter } from '../../../infra/db/repository/shared/converter/ToPairConverter';

describe('ToRecessStatusUsecase', (): void => {
  const prisma = prismaClient;

  const toTaskConverter = new ToTaskConverter();
  const toHavingTaskCollectionConverter = new ToHavingTaskCollectionConverter(toTaskConverter);
  const toParticipantConverter = new ToParticipantConverter(
    toTaskConverter,
    toHavingTaskCollectionConverter,
  );
  const toPairConverter = new ToPairConverter(
    toHavingTaskCollectionConverter,
    toParticipantConverter,
  );

  const participantRepository = new ParticipantRepository(
    prismaClient,
    toTaskConverter,
    toParticipantConverter,
    toHavingTaskCollectionConverter,
  );
  const taskRepository = new TaskRepository(prismaClient, toTaskConverter);
  const pairRepository = new PairRepository(prisma, toPairConverter);

  const service = new DistributeOneParticipantForAnotherPairDomainService(pairRepository);
  const removeUsecase = new RemoveParticipantInPairUsecase(
    participantRepository,
    pairRepository,
    service,
  );
  const toRecessStatusUsecase = new ToRecessStatusUsecase(
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
    test('[正常]３人ペアのうち１人の在籍ステータスを休会中に変更できる', async () => {
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
      // ペアが２人になっている(休会中の参加者はペアに所属できないので)
      await expect(nowParticipantCount(targetPairName)).resolves.toEqual(2);
      // ターゲットの参加者は休会中になっている
      await expect(nowStatus(targetParticipantId)).resolves.toEqual(EnrolledStatusEnum.recess);
      // ターゲットがペアに所属していない
      await expect(nowPairName(targetParticipantId)).resolves.toEqual(null);
    });

    test('[正常]2人ペアのうち一人を在籍ステータスを休会中に変更できる', async () => {
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
      // ターゲットの参加者は休会中になっている
      await expect(nowStatus(targetParticipantId)).resolves.toEqual(EnrolledStatusEnum.recess);
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
