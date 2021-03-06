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
import { dummyPair2, dummyPair3 } from '../../../../testUtil/dummy/dummyPair';
import clone from 'clone';
import { ToTaskConverter } from '../../../../infra/db/repository/shared/converter/ToTaskConverter';
import { ToHavingTaskCollectionConverter } from '../../../../infra/db/repository/shared/converter/ToHavingTaskCollectionConverter';
import { ToParticipantConverter } from '../../../../infra/db/repository/shared/converter/ToParticipantConverter';
import { ToPairConverter } from '../../../../infra/db/repository/shared/converter/ToPairConverter';

describe('PairRepository', (): void => {
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
    await participantRepository.create(dummyParticipant1);
    await participantRepository.create(dummyParticipant3);
    await participantRepository.create(dummyParticipant4);
    await participantRepository.create(dummyParticipant5);
    await participantRepository.create(dummyParticipant6);
    await participantRepository.create(dummyParticipant7);
    await pairRepository.create(dummyPair2);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('create()', () => {
    test('[??????]???????????????', async () => {
      // before
      expect(await prisma.pair.count()).toBe(1);
      // after
      const result = await pairRepository.create(dummyPair3);
      expect(await prisma.pair.count()).toBe(2);
      await expect(result).toStrictEqual(dummyPair3);
    });
  });

  describe('findAll()', () => {
    test('[??????]???????????????', async () => {
      expect(await prisma.pair.count()).toBe(1);
      await pairRepository.create(dummyPair3);
      const actual = await pairRepository.findAll();
      expect(actual.length).toBe(2);
      expect(await prisma.pair.count()).toBe(2);
    });
  });

  describe('findOne()', () => {
    test('[??????]???????????????', async () => {
      const actual = await pairRepository.findOne(dummyPair2.id.toValue());
      expect(actual.equals(dummyPair2)).toBe(true);
    });
  });

  describe('update()', () => {
    const getParticipant = (id, participants) => {
      return participants.find((one) => id === one.participantId);
    };

    test('[??????]???????????????', async () => {
      await pairRepository.create(dummyPair3);

      const beforeParticipants = await prisma.participant.findMany();
      const beforeParticipant1 = getParticipant(dummyParticipant1.id.toValue(), beforeParticipants);
      const beforeParticipant5 = getParticipant(dummyParticipant5.id.toValue(), beforeParticipants);
      expect(beforeParticipant1.pairName).toBe(null); // ?????????????????????????????????????????????
      expect(beforeParticipant5.pairName).toBe('c'); // dummyPair3(??????c)?????????????????????

      // ?????????????????????????????????????????????????????????????????????????????????
      const pair = clone(dummyPair3);
      pair.removeParticipant(dummyParticipant5);
      pair.addParticipant(dummyParticipant1);

      // ?????????????????????????????????
      const result = await pairRepository.update(pair);
      expect(result.equals(pair)).toBe(true);

      // ????????????????????????????????????????????????????????????????????????????????????????????????ull?????????
      // ??????????????????????????????C?????????
      const afterParticipants = await prisma.participant.findMany();
      const p5 = getParticipant(dummyParticipant5.id.toValue(), afterParticipants);
      const p1 = getParticipant(dummyParticipant1.id.toValue(), afterParticipants);
      const p6 = getParticipant(dummyParticipant6.id.toValue(), afterParticipants);
      const p7 = getParticipant(dummyParticipant7.id.toValue(), afterParticipants);
      expect(p5.pairName).toBe(null); // ??????????????????????????????null??????????????????
      expect(p1.pairName).toBe('c'); // ???????????????????????????C??????????????????
      expect(p6.pairName).toBe('c');
      expect(p7.pairName).toBe('c');
    });
  });

  describe('delete()', () => {
    test('[??????]???????????????', async () => {
      expect(await prisma.pair.count()).toBe(1);
      const beforeParticipantCount = await prisma.participant.count({ where: { pairName: 'b' } });
      expect(beforeParticipantCount).toBe(2);
      //
      await pairRepository.delete(dummyPair2);
      expect(await prisma.pair.count()).toBe(0);
      const afterParticipantCount = await prisma.participant.count({ where: { pairName: 'b' } });
      expect(afterParticipantCount).toBe(0);
    });
  });
});
