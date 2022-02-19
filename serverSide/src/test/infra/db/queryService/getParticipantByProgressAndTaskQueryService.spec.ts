import { TaskRepository } from '../../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummy/dummyTask';
import { prismaClient } from '../../../../util/prisma/prismaClient';
import { ProgressStatus, ProgressStatusEnum } from '../../../../domain/participant/progressStatus';
import {
  qsDummyParticipant1,
  qsDummyParticipant2,
  qsDummyParticipant3,
  qsDummyParticipant4,
  qsDummyParticipant5,
  qsDummyParticipant6,
  qsDummyParticipant7,
} from '../../../../testUtil/dummy/dummyPerticipant';
import { ParticipantRepository } from '../../../../infra/db/repository/participantRepository';
import { GetParticipantByProgressAndTaskQueryService } from '../../../../infra/db/queryService/getParticipantByProgressAndTaskQueryService';
import { ToTaskConverter } from '../../../../infra/db/repository/shared/converter/ToTaskConverter';
import { ToHavingTaskCollectionConverter } from '../../../../infra/db/repository/shared/converter/ToHavingTaskCollectionConverter';
import { ToParticipantConverter } from '../../../../infra/db/repository/shared/converter/ToParticipantConverter';

describe('GetParticipantByProgressAndTaskQueryService', (): void => {
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
  const qs = new GetParticipantByProgressAndTaskQueryService(
    prisma,
    toTaskConverter,
    toHavingTaskCollectionConverter,
    toParticipantConverter,
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
    await participantRepository.create(qsDummyParticipant1);
    await participantRepository.create(qsDummyParticipant2);
    await participantRepository.create(qsDummyParticipant3);
    await participantRepository.create(qsDummyParticipant4);
    await participantRepository.create(qsDummyParticipant5);
    await participantRepository.create(qsDummyParticipant6);
    await participantRepository.create(qsDummyParticipant7);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('do()', () => {
    const complete = ProgressStatus.create({ progressStatus: ProgressStatusEnum.complete });
    test('[正常]タスク1つで取得できる', async () => {
      const result = await qs.do([dummyTask1], complete, 10, 1);
      expect(result.length).toEqual(6);
    });
    test('[正常]タスク複数を取得できる', async () => {
      const result = await qs.do([dummyTask1, dummyTask2], complete, 10, 1);
      expect(result.length).toEqual(1);
    });
    test('[正常]take数分取得できる', async () => {
      const result = await qs.do([dummyTask1], complete, 3, 1);
      expect(result.length).toEqual(3);
    });
    test('[正常]take数分取得できる', async () => {
      const result = await qs.do([dummyTask1], complete, 3, 1);
      expect(result.length).toEqual(3);
    });
    test('[正常]ページ', async () => {
      const all = await qs.do([dummyTask1], complete, 10, 1);
      const page1 = await qs.do([dummyTask1], complete, 2, 1);
      const page2 = await qs.do([dummyTask1], complete, 2, 2);
      const page3 = await qs.do([dummyTask1], complete, 2, 3);
      expect(all[0]).toEqual(page1[0]);
      expect(all[1]).toEqual(page1[1]);
      expect(all[2]).toEqual(page2[0]);
      expect(all[3]).toEqual(page2[1]);
      expect(all[4]).toEqual(page3[0]);
      expect(all[5]).toEqual(page3[1]);
    });
    test('[正常]0件の場合', async () => {
      const result = await qs.do([dummyTask3], complete, 10, 1);
      expect(result).toEqual([]);
    });
  });
});
