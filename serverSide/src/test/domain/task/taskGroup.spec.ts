import { TaskGroup, TaskGroupEnum } from '../../../domain/task/taskGroup';

describe('TaskGroup', (): void => {
  test('TaskGroupEnum型でオブジェクトが生成できること', () => {
    const taskGroup = { taskGroup: TaskGroupEnum.webBasic };
    const actual = TaskGroup.create(taskGroup);
    expect(actual).toBeInstanceOf(TaskGroup);
  });

  test('string型でオブジェクトが生成できること', () => {
    const taskGroup = { taskGroup: '設計' };
    const actual = TaskGroup.create(taskGroup);
    expect(actual).toBeInstanceOf(TaskGroup);
  });
  test('TaskGroupEnumに存在しない値なら失敗する', () => {
    const taskGroup = { taskGroup: 'ああああ' };

    expect(() => {
      TaskGroup.create(taskGroup);
    }).toThrowError('タスクグループ名が不正です。');
  });
});
