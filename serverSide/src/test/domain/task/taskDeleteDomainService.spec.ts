import { TaskGroupDeleteDomainService } from '../../../domain/taskGroup/taskGroupDeleteDomainService';
import { prismaClient } from '../../../util/prisma/prismaClient';
import { ParticipantRepository } from '../../../infra/db/repository/participantRepository';
import { TaskRepository } from '../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../testUtil/dummy/dummyTask';
import { dummyParticipant1, dummyParticipant3 } from '../../../testUtil/dummy/dummyPerticipant';
import { TaskDeleteDomainService } from '../../../domain/task/taskDeleteDomainService';
import { Converter } from '../../../infra/db/repository/shared/converter';

describe('TaskGroupDeleteDomainService', () => {
  const prisma = prismaClient;
  const converter = new Converter(prisma);
  const participantRepository = new ParticipantRepository(prisma, converter);
  const taskRepository = new TaskRepository(prisma, converter);
  const taskDeleteDomainService = new TaskDeleteDomainService(
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
