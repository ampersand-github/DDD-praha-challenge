import { TaskGroup, TaskGroupEnum } from '../../../domain/task/taskGroup';

describe('TaskGroup', (): void => {
  const taskGroup = { taskGroup: TaskGroupEnum.webBasic };

  test('オブジェクトが生成できること', () => {
    const actual = TaskGroup.create(taskGroup);
    expect(actual).toBeInstanceOf(TaskGroup);
  });
});
