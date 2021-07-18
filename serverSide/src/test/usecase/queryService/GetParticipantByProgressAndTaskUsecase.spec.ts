import { GetParticipantByProgressAndTaskUsecase } from '../../../usecase/queryService/GetParticipantByProgressAndTaskUsecase';
import { TaskRepository } from '../../../infra/db/repository/taskRepository';
import { GetParticipantByProgressAndTaskQueryService } from '../../../infra/db/queryService/getParticipantByProgressAndTaskQueryService';
import { prismaClient } from '../../../util/prisma/prismaClient';
import { Converter } from '../../../infra/db/repository/shared/converter';
import { ParticipantRepository } from '../../../infra/db/repository/participantRepository';
import { truncateAllTable } from '../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../testUtil/dummy/dummyTask';
import {
  qsDummyParticipant1,
  qsDummyParticipant2,
  qsDummyParticipant3,
  qsDummyParticipant4,
  qsDummyParticipant5,
  qsDummyParticipant6,
  qsDummyParticipant7,
} from '../../../testUtil/dummy/dummyPerticipant';
import { ProgressStatusEnum } from '../../../domain/participant/progressStatus';

describe('GetParticipantByProgressAndTaskUsecase', (): void => {
  const converter = new Converter();
  const taskRepository = new TaskRepository(prismaClient, converter);
  const qs = new GetParticipantByProgressAndTaskQueryService(prismaClient, converter);
  const usecase = new GetParticipantByProgressAndTaskUsecase(qs, taskRepository);
  const participantRepository = new ParticipantRepository(prismaClient, converter);

  beforeAll(async () => {
    await truncateAllTable();
  });

  beforeEach(async () => {
    await prismaClient.personalInfo.deleteMany();
    await prismaClient.participantHavingTask.deleteMany();
    await prismaClient.task.deleteMany();
    await prismaClient.participant.deleteMany();
    await prismaClient.pair.deleteMany();
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

  describe('do', (): void => {
    test('[正常]作成できる場合', async () => {
      const taskIdList: [string, ...string[]] = [dummyTask1.id.toValue()];
      await usecase.do(taskIdList, ProgressStatusEnum.complete, 1);
    });
  });
});
