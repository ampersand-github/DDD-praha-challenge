import { TaskGroup, TaskGroupEnum } from '../../../domain/task/taskGroup';
import { Task } from '../../../domain/task/task';

describe('Task', (): void => {
  const data = {
    no: 1,
    name: 'よく使うHTTPヘッダを理解する',
    description:
      'HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を変化させて、情報を「ボディ」で送信する、非常にシンプルな作りです',
    group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
  };

  test('オブジェクトが生成できること', () => {
    const actual = Task.create(data);
    expect(actual).toBeInstanceOf(Task);
  });
});
