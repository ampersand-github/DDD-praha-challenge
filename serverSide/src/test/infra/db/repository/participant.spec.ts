import { TaskRepository } from '../../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../../testUtil/reposiotry/truncateAllTable';
import { prismaClient } from '../../../../util/prisma/prismaClient';
import { ParticipantRepository } from '../../../../infra/db/repository/participantRepository';
import { dummyParticipant1, dummyParticipant3 } from '../../../../testUtil/dummy/dummyPerticipant';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummy/dummyTask';
import { ProgressStatusEnum } from '../../../../domain/participant/progressStatus';

describe('ParticipantRepository', (): void => {
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
        const updated = await participantRepository.findOne(dummyParticipant1.id.toValue());
        //
        updated.changeProgressStatus(dummyTask2, ProgressStatusEnum.complete);
        expect(updated.getStatusFromTask(dummyTask2)).toBe(ProgressStatusEnum.complete);
        //
        const result = await participantRepository.update(updated);
        // 結果確認
        expect(updated).toStrictEqual(result);
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
          const id = dummyParticipant1.id.toValue();
          const result = await participantRepository.findOne(dummyParticipant1.id.toValue());
          expect(result.participantHavingTaskCollection.length).toBe(3);
          await participantRepository.delete(result);
          await expect(participantRepository.findOne(id)).rejects.toThrowError();
        });
      });
      describe('deleteParticipantHavingTaskByTask()', () => {
        test('[正常]削除できる', async () => {
          // 現在の参加者保有課題件数
          const id = dummyParticipant1.id.toValue();
          const beforeOne = await participantRepository.findOne(id);
          const beforeCount = beforeOne.participantHavingTaskCollection.length;
          expect(beforeCount).toBe(3);
          //
          const deleteTargetTask = dummyParticipant1.participantHavingTaskCollection[0].task;
          await participantRepository.deleteParticipantHavingTaskByTask(deleteTargetTask);
          const afterOne = await participantRepository.findOne(id);
          const afterCount = afterOne.participantHavingTaskCollection.length;
          await expect(afterCount).toBe(2);
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
