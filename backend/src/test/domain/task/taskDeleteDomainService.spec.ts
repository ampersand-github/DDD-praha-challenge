import { prismaClient } from '../../../util/prisma/prismaClient';
import { ParticipantRepository } from '../../../infra/db/repository/participantRepository';
import { TaskRepository } from '../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../testUtil/dummy/dummyTask';
import { dummyParticipant1, dummyParticipant3 } from '../../../testUtil/dummy/dummyPerticipant';
import { TaskDeleteDomainService } from '../../../domain/task/taskDeleteDomainService';
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
  const participantRepository = new ParticipantRepository(
    prismaClient,
    toTaskConverter,
    toParticipantConverter,
    toHavingTaskCollectionConverter,
  );
  const taskRepository = new TaskRepository(prismaClient, toTaskConverter);
  const taskDeleteDomainService = new TaskDeleteDomainService(
    taskRepository,
    participantRepository,
  );

  beforeAll(async () => {
    await truncateAllTable();
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
      const beforeHavingTaskCount = await prisma.participantHavingTask.count();
      expect(beforeHavingTaskCount).toBe(6);
      const beforeTaskCount = await prisma.task.count();
      expect(beforeTaskCount).toBe(3);

      const taskId = dummyTask1.id.toValue();
      await taskDeleteDomainService.do({ taskId: taskId });

      const afterHavingTaskCount = await prisma.participantHavingTask.count();
      expect(afterHavingTaskCount).toBe(4);
      const afterTaskCount = await prisma.task.count();
      expect(afterTaskCount).toBe(2);
    });
  });
});
