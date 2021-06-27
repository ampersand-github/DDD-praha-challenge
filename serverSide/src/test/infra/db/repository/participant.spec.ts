import { TaskRepository } from '../../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../../testUtil/reposiotry/truncateAllTable';
import { prismaClient } from '../../../../util/prisma/prismaClient';
import { ParticipantRepository } from '../../../../infra/db/repository/participantRepository';
import { dummyParticipant1, dummyParticipant3 } from '../../../../testUtil/dummy/dummyPerticipant';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummy/dummyTask';
import { ProgressStatusEnum } from '../../../../domain/participant/progressStatus';

describe('TaskRepository', (): void => {
  const participantRepository = new ParticipantRepository();
  const taskRepository = new TaskRepository();

  beforeAll(() => {
    truncateAllTable();
  });

  beforeEach(async () => {
    await prismaClient.personalInfo.deleteMany();
    await prismaClient.participantHavingTask.deleteMany();
    await prismaClient.task.deleteMany(); // truncateと同じ
    await prismaClient.participant.deleteMany();
    await taskRepository.create(dummyTask1);
    await taskRepository.create(dummyTask2);
    await taskRepository.create(dummyTask3);
    await participantRepository.create(dummyParticipant1);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });
  describe('create()', () => {
    test('[正常]作成できる', async () => {
      // 結果確認
      const result = await participantRepository.create(dummyParticipant3);
      expect(result).toStrictEqual(dummyParticipant3);
    });

    describe('update()', () => {
      test('[正常]更新できる', async () => {
        // データ作成
        const update2 = dummyParticipant1.changeProgressStatus(
          dummyTask2,
          ProgressStatusEnum.complete,
        );
        // 結果確認
        expect(update2).toStrictEqual(update2);
      });

      describe('findOne()', () => {
        test('[正常]取得できる', async () => {
          // 結果確認
          const result = await participantRepository.findOne(dummyParticipant1.id.toValue());
          expect(result).toStrictEqual(dummyParticipant1);
        });
      });

      describe('findAll()', () => {
        test('[正常]取得できる', async () => {
          // 結果確認
          await participantRepository.create(dummyParticipant3);
          const result = await participantRepository.findAll();
          expect(result).toStrictEqual([dummyParticipant1, dummyParticipant3]);
        });
      });

      describe('delete()', () => {
        test('[正常]削除できる', async () => {
          // 結果確認
          const result = await participantRepository.delete(dummyParticipant1);
          expect(result).toStrictEqual(
            1 + 1 + dummyParticipant1.participantHavingTaskCollection.length,
          );
        });
      });

      describe('isExistMailAddress()', () => {
        test('[正常]存在する', async () => {
          // 結果確認
          const result = await participantRepository.isExistMailAddress(
            dummyParticipant1.mailAddress,
          );
          await expect(result).toStrictEqual(true);
        });
      });
    });
  });
});
