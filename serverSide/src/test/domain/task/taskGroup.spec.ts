import { TaskGroup, TaskGroupEnum } from '../../../domain/task/taskGroup';

describe('TaskGroup', (): void => {
  const taskGroup = { taskGroup: TaskGroupEnum.webBasic };

  test('引数で与えた値が取得できるこ', () => {
    const actual = TaskGroup.create(taskGroup);
    expect(actual.values.taskGroup).toBe(taskGroup.taskGroup);

  });
});
