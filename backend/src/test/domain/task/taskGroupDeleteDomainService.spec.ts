import { TaskGroupDeleteDomainService } from '../../../domain/taskGroup/taskGroupDeleteDomainService';
import { prismaClient } from '../../../util/prisma/prismaClient';
import { ParticipantRepository } from '../../../infra/db/repository/participantRepository';
import { TaskRepository } from '../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../testUtil/dummy/dummyTask';
import { dummyParticipant1, dummyParticipant3 } from '../../../testUtil/dummy/dummyPerticipant';
import clone from 'clone';
import { TaskGroupEnum } from '../../../domain/taskGroup/taskGroup';
import { ToTaskConverter } from '../../../infra/db/repository/shared/converter/ToTaskConverter';
import { ToHavingTaskCollectionConverter } from '../../../infra/db/repository/shared/converter/ToHavingTaskCollectionConverter';
import { ToParticipantConverter } from '../../../infra/db/repository/shared/converter/ToParticipantConverter';

describe('TaskGroupDeleteDomainService', () => {
  const prisma = prismaClient;
  const toTaskConverter = new ToTaskConverter();
  const toHavingTaskCollectionConverter = new ToHavingTaskCollectionConverter(toTaskConverter);
  const toParticipantConverter = new ToParticipantConverter(
    toTaskConverter,
    toHavingTaskCollectionConverter,
  );
  const taskRepository = new TaskRepository(prisma, toTaskConverter);
  const participantRepository = new ParticipantRepository(
    prisma,
    toTaskConverter,
    toParticipantConverter,
    toHavingTaskCollectionConverter,
  );
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
    test('[??????]???????????????', async () => {
      const beforeCount = await prisma.participantHavingTask.count();
      expect(beforeCount).toBe(6);

      await taskGroupDeleteDomainService.do({ taskGroup: 'WEB?????????' });

      const afterCount = await prisma.participantHavingTask.count();
      expect(afterCount).toBe(0);

      const taskCount = await prisma.task.count();
      expect(taskCount).toBe(0);
    });
    test('[??????]????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????', async () => {
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
  describe('[??????][private]deleteHavingTaskByTaskList()', (): void => {
    test('[??????]', async () => {
      // ???????????????
      const participant = clone(dummyParticipant1);
      const targetTaskList = [dummyTask1, dummyTask2];
      // ????????????
      expect(participant.participantHavingTaskCollection.length).toBe(3);
      const updated = taskGroupDeleteDomainService['deleteHavingTaskByTaskList'](
        participant,
        targetTaskList,
      );
      expect(updated.participantHavingTaskCollection.length).toBe(1);
    });
  });
});
