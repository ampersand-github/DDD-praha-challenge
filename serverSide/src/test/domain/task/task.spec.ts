import { Task } from '../../../domain/task/task';
import { task1 } from '../../../test-dummy/domain/taskDummyData';

describe('Task', (): void => {
  test('オブジェクトが生成できること', () => {
    expect(task1).toBeInstanceOf(Task);
  });
});
