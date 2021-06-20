import { TaskRepository } from '../../../../infra/db/repository/taskRepository';
import { truncateAllTable } from '../../../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummy/dummyTask';
import { prismaClient } from '../../../../util/prisma/prismaClient';
import { TaskGroup } from '../../../../domain/taskGroup/taskGroup';
import clone from 'clone';

describe('TaskRepository', (): void => {
  const repo = new TaskRepository();

  beforeAll(() => {
    truncateAllTable();
  });

  beforeEach(async () => {
    await prismaClient.task.deleteMany(); // truncateと同じ
    await repo.create(dummyTask1);
    await repo.create(dummyTask2);
    // TODO participantHavingTasksテーブルつくったらここに生やす
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

    test('[異常]データが重複しているので作成できない', async () => {
      // データ作成
      await repo.create(dummyTask3);
      // 結果確認
      await expect(repo.create(dummyTask3)).rejects.toThrowError(
        `taskIdが重複していますので作成されませんでした。`,
      );
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
      // データ作成
      // todo participantHavingTasks
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
      const updatedTask = dummyTask1.changeName(updatedName);
      await repo.update(updatedTask);
      // 結果確認
      const actual = await repo.findOne(updatedTask.id.toValue());
      expect(actual.name).toStrictEqual(updatedName);
    });

    test('[異常]存在しないタスク名なので更新できない', async () => {
      await expect(repo.update(dummyTask3)).rejects.toThrowError(
        `更新すべきレコードが見つかりませんでした。`,
      );
    });
    test('[異常]更新後のnoが他のと重複する', async () => {
      // データ作成
      const task1 = clone(dummyTask1);
      const updatedTask = task1.changeNo(2); // 1 -> 2
      // 結果確認
      await expect(repo.update(updatedTask)).rejects.toThrowError(
        `taskNoが重複していますので更新されませんでした。`,
      );
    });
  });
  describe('taskMaxNo()', () => {
    test('[正常]タスクナンバーの最大値が取得できる', async () => {
      // 結果確認
      const taskMaxNo = await repo.taskMaxNo();
      expect(taskMaxNo).toStrictEqual(2);
    });
  });

  describe('reAssignTaskNo()', () => {
    test('[正常]', async () => {
      // データ作成
      const reAssignTaskNoTask = clone(dummyTask1);
      const updatedTask = reAssignTaskNoTask.changeNo(99);
      await repo.update(updatedTask);
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
