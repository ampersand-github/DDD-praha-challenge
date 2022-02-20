import { TaskGroup, TaskGroupEnum } from '../../../domain/taskGroup/taskGroup';

describe('TaskGroup', (): void => {
  test('オブジェクトが生成できること', () => {
    const taskGroup = { taskGroup: TaskGroupEnum.webBasic };
    const actual = TaskGroup.create(taskGroup);
    expect(actual).toBeInstanceOf(TaskGroup);
  });

  test('createで失敗', () => {
    const taskGroup2 = { taskGroup: 'aaa' };

    expect(() => {
      TaskGroup.create(taskGroup2);
    }).toThrowError('タスクグループ名が不正です。');
  });
});
