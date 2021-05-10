import { TaskGroup, TaskGroupEnum } from '../../../domain/task/taskGroup';
import { Task } from '../../../domain/task/task';

describe('Task', (): void => {
  const active = {
    no: 1,
    name: 'よく使うHTTPヘッダを理解する',
    description:
      'HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を変化させて、情報を「ボディ」で送信する、非常にシンプルな作りです',
    group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
  };

  test('引数で与えた値が取得できるこ', () => {
    const actual = Task.create(active);
    expect(actual.values.name).toBe('よく使うHTTPヘッダを理解する');

  });
});
