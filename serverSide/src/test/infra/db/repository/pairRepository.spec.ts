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
import { Converter } from '../../../../infra/db/repository/shared/converter';
import clone from 'clone';

describe('PairRepository', (): void => {
  const prisma = prismaClient;
  const converter: Converter = new Converter();
  const taskRepository = new TaskRepository(prisma);
  const participantRepository = new ParticipantRepository(prisma);
  const pairRepository = new PairRepository(prisma, converter);

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
    test('[正常]作成できる', async () => {
      // before
      expect(await prisma.pair.count()).toBe(1);
      // after
      const result = await pairRepository.create(dummyPair3);
      expect(await prisma.pair.count()).toBe(2);
      await expect(result).toStrictEqual(dummyPair3);
    });
  });

  describe('findAll()', () => {
    test('[正常]取得できる', async () => {
      expect(await prisma.pair.count()).toBe(1);
      await pairRepository.create(dummyPair3);
      const actual = await pairRepository.findAll();
      expect(actual.length).toBe(2);
      expect(await prisma.pair.count()).toBe(2);
    });
  });

  describe('findOne()', () => {
    test('[正常]取得できる', async () => {
      const actual = await pairRepository.findOne(dummyPair2.id.toValue());
      expect(actual.equals(dummyPair2)).toBe(true);
    });
  });

  describe('update()', () => {
    test('[正常]更新できる', async () => {
      await pairRepository.create(dummyPair3);

      // createしたペアに所属する参加者のペア名がdummyPair3のペア名
      const beforeParticipants = await prisma.participant.findMany({
        where: { pairName: dummyPair3.pairName },
      });
      await Promise.all(
        beforeParticipants.map((one) => expect(one.pairName).toEqual(dummyPair3.pairName)),
      );

      // 更新できているか確かめるために参加者の削除と更新をする
      const pair = clone(dummyPair3);
      pair.removeParticipant(dummyParticipant5);
      pair.addParticipant(dummyParticipant1);

      // データの更新と等価比較
      const result = await pairRepository.update(pair);
      expect(result.equals(pair)).toBe(true);

      // 更新後テーブルの参加者のペアの確認
      const afterParticipants = await prisma.participant.findMany();
      const p5 = await afterParticipants.find(
        (one) => dummyParticipant5.id.toValue() === one.participantId,
      );
      const p1 = await afterParticipants.find(
        (one) => dummyParticipant1.id.toValue() === one.participantId,
      );
      const p6 = await afterParticipants.find(
        (one) => dummyParticipant6.id.toValue() === one.participantId,
      );
      const p7 = await afterParticipants.find(
        (one) => dummyParticipant7.id.toValue() === one.participantId,
      );
      expect(p5.pairName).toBe(null);
      expect(p1.pairName).toBe('c');
      expect(p6.pairName).toBe('c');
      expect(p7.pairName).toBe('c');
    });
  });

  describe('delete()', () => {
    test('[正常]削除できる', async () => {
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
