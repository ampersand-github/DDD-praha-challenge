import { TaskGroupDeleteDomainService } from '../../../domain/taskGroup/taskGroupDeleteDomainService';
import { prismaClient } from '../../../util/prisma/prismaClient';
import { ParticipantRepository } from '../../../infra/db/repository/participantRepository';
import { TaskRepository } from '../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../testUtil/dummy/dummyTask';
import { dummyParticipant1, dummyParticipant3 } from '../../../testUtil/dummy/dummyPerticipant';
import clone from 'clone';
import { TaskGroupEnum } from '../../../domain/taskGroup/taskGroup';
import { Converter } from '../../../infra/db/repository/shared/converter';

describe('TaskGroupDeleteDomainService', () => {
  const prisma = prismaClient;
  const converter = new Converter(prisma);
  const participantRepository = new ParticipantRepository(prisma, converter);
  const taskRepository = new TaskRepository(prisma, converter);
  const taskGroupDeleteDomainService = new TaskGroupDeleteDomainService(
    taskRepository,
    participantRepository,
  );

  beforeAll(() => {
    truncateAllTable();
  });

  beforeEach(async () => {
    await prismaClient.personalInfo.deleteMany();
    await prismaClient.participantHavingTask.deleteMany();
    await prismaClient.task.deleteMany();
    await prismaClient.participant.deleteMany();
    await taskRepository.create(dummyTask1);
    await taskRepository.create(dummyTask2);
    await taskRepository.create(dummyTask3);
    await participantRepository.create(dummyParticipant1);
    await participantRepository.create(dummyParticipant3);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]削除できる', async () => {
      const beforeCount = await prisma.participantHavingTask.count();
      expect(beforeCount).toBe(6);

      await taskGroupDeleteDomainService.do({ taskGroup: 'WEBの基礎' });

      const afterCount = await prisma.participantHavingTask.count();
      expect(afterCount).toBe(0);

      const taskCount = await prisma.task.count();
      expect(taskCount).toBe(0);
    });
    test('[正常]削除対象のタスクグループに紐づくタスクや参加者保有課題が存在しない場合でも正常に動作する', async () => {
      await prismaClient.participantHavingTask.deleteMany();
      const participantCount = await prisma.participantHavingTask.count();
      expect(participantCount).toBe(0);
      const beforeCount = await prisma.task.count({
        where: {
          taskGroupName: TaskGroupEnum.test,
        },
      });
      expect(beforeCount).toBe(0);
      await taskGroupDeleteDomainService.do({ taskGroup: TaskGroupEnum.test });
      const afterCount = await prisma.task.count({
        where: {
          taskGroupName: TaskGroupEnum.test,
        },
      });
      expect(afterCount).toBe(0);
    });
  });
  describe('[正常][private]deleteHavingTaskByTaskList()', (): void => {
    test('[正常]', async () => {
      // データ作成
      const participant = clone(dummyParticipant1);
      const targetTaskList = [dummyTask1, dummyTask2];
      // 結果確認
      expect(participant.participantHavingTaskCollection.length).toBe(3);
      const updated = taskGroupDeleteDomainService['deleteHavingTaskByTaskList'](
        participant,
        targetTaskList,
      );
      expect(updated.participantHavingTaskCollection.length).toBe(1);
    });
  });
});
