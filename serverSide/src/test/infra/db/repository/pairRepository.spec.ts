import { truncateAllTable } from '../../../../testUtil/reposiotry/truncateAllTable';
import { prismaClient } from '../../../../util/prisma/prismaClient';
import { PairRepository } from '../../../../infra/db/repository/pairRepository';
import {
  dummyParticipant1,
  dummyParticipant3,
  dummyParticipant4,
  dummyParticipant5,
  dummyParticipant6,
  dummyParticipant7,
} from '../../../../testUtil/dummy/dummyPerticipant';
import { ParticipantRepository } from '../../../../infra/db/repository/participantRepository';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummy/dummyTask';
import { TaskRepository } from '../../../../infra/db/repository/taskRepository';

describe('PairRepository', (): void => {
  const prisma = prismaClient;
  const taskRepository = new TaskRepository(prisma);
  const participantRepository = new ParticipantRepository(prisma);
  const pairRepository = new PairRepository(prisma);

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
    await participantRepository.create(dummyParticipant4);
    await participantRepository.create(dummyParticipant5);
    await participantRepository.create(dummyParticipant6);
    await participantRepository.create(dummyParticipant7);
  });

  afterAll(async () => {
    //  await prismaClient.$disconnect();
  });

  describe('findAll()', () => {
    test('[正常]取得できる', async () => {
      // データ作成
      // 結果確認
    });
  });
  describe('findOne()', () => {
    test('[正常]取得できる', async () => {
      // データ作成
      // 結果確認
    });
  });
  describe('create()', () => {
    test('[正常]作成できる', async () => {
      // データ作成
      // 結果確認
    });
  });
  describe('update()', () => {
    test('[正常]更新できる', async () => {
      // データ作成
      // 結果確認
    });
  });
  describe('delete()', () => {
    test('[正常]削除できる', async () => {
      // データ作成
      // 結果確認
    });
  });
});
