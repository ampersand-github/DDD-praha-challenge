import { TaskRepository } from '../../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummy/dummyTask';
import { prismaClient } from '../../../../util/prisma/prismaClient';
import { TaskGroup } from '../../../../domain/taskGroup/taskGroup';
import clone from 'clone';

describe('TaskRepository', (): void => {
  const repo = new TaskRepository(prismaClient);

  beforeAll(() => {
    truncateAllTable();
  });

  beforeEach(async () => {
    await prismaClient.participantHavingTask.deleteMany();
    await prismaClient.task.deleteMany(); // truncateと同じ
    await repo.create(dummyTask1);
    await repo.create(dummyTask2);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('findAll()', () => {
    test('[正常]取得できる', async () => {
      // 結果確認
      const actual = await repo.findAll();
      expect(actual).toEqual([dummyTask1, dummyTask2]);
    });
  });

  describe('findOne()', () => {
    test('[正常]取得できる', async () => {
      // 結果確認
      const actual = await repo.findOne(dummyTask1.id.toValue());
      expect(actual).toEqual(dummyTask1);
    });
    test('[異常]存在しないIDなので取得できない', async () => {
      const id = '99999999-9999-zzzz-bbbb-999999999999';
      await expect(repo.findOne(id)).rejects.toThrowError();
    });
  });
  describe('findByTaskGroup()', () => {
    test('[正常]取得できる', async () => {
      // 結果確認
      const groupName = TaskGroup.create({ taskGroup: dummyTask1.group });
      const actual = await repo.findByTaskGroup(groupName);
      expect(actual).toEqual([dummyTask1, dummyTask2]);
    });
    test('[異常]まだ存在しないグループなので取得できない', async () => {
      const groupName = TaskGroup.create({ taskGroup: '設計' });
      await expect(repo.findByTaskGroup(groupName)).resolves.toEqual([]);
    });
  });

  describe('create()', () => {
    test('[正常]データを作成できる', async () => {
      // データ作成
      await repo.create(dummyTask3);
      // 結果確認
      const actual = await repo.findOne(dummyTask3.id.toValue());
      expect(actual).toEqual(dummyTask3);
    });

    test('[異常]', async () => {
      // データ作成
      await repo.create(dummyTask3);
      // 結果確認
      await expect(repo.create(dummyTask3)).rejects.toThrowError();
    });
  });

  describe('delete()', () => {
    test('[正常]削除できる(1テーブルのみ)', async () => {
      // 結果確認
      const actual = await repo.delete(dummyTask1);
      // 削除したデータが取得できないので1件のみ取得できる
      expect(actual).toStrictEqual(1);
    });
    test('[正常]削除できる(複数テーブルのみ)', async () => {
      // 結果確認
      const actual = await repo.delete(dummyTask1);
      // 削除したデータが取得できないので1件のみ取得できる
      expect(actual).toStrictEqual(1);
    });
  });

  describe('update()', () => {
    test('[正常]更新できる', async () => {
      // データ作成
      const updatedName = 'update';
      dummyTask1.changeName(updatedName);
      await repo.update(dummyTask1);
      // 結果確認
      const actual = await repo.findOne(dummyTask1.id.toValue());
      expect(actual.name).toStrictEqual(updatedName);
    });
  });
  describe('taskMaxNo()', () => {
    test('[正常]タスクナンバーの最大値が取得できる', async () => {
      // 結果確認
      const taskMaxNo = await repo.taskMaxNo();
      expect(taskMaxNo).toStrictEqual(2);
    });
    test('[正常]タスクがないときに0が返る', async () => {
      await truncateAllTable();
      // 結果確認
      const taskMaxNo = await repo.taskMaxNo();
      expect(taskMaxNo).toStrictEqual(0);
    });
  });

  describe('reAssignTaskNo()', () => {
    test('[正常]', async () => {
      // データ作成
      const reAssignTaskNoTask = clone(dummyTask1);
      reAssignTaskNoTask.changeNo(99);
      await repo.update(reAssignTaskNoTask);
      // 結果確認
      // noの再割当て 2 -> 1 になって 99 -> 2になっている
      await repo.reAssignTaskNo();
      const dummyTask1Updated = await repo.findOne(dummyTask1.id.toValue());
      const dummyTask2Updated = await repo.findOne(dummyTask2.id.toValue());
      await expect(dummyTask1Updated.no).toStrictEqual(2);
      await expect(dummyTask2Updated.no).toStrictEqual(1);
    });
  });
});
