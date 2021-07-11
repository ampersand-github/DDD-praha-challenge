import { truncateAllTable } from '../../../../testUtil/reposiotry/truncateAllTable';
import { prismaClient } from '../../../../util/prisma/prismaClient';
import { PairRepository } from '../../../../infra/db/repository/pairRepository';

describe('PairRepository', (): void => {
  const repo = new PairRepository(prismaClient);

  beforeAll(() => {
    truncateAllTable();
  });

  beforeEach(async () => {
    // await prismaClient.participantHavingTask.deleteMany();
    // await prismaClient.task.deleteMany(); // truncateと同じ
    // await repo.create(dummyTask1);
    //  await repo.create(dummyTask2);
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
