import { TaskGroup } from '../../domain/task/taskGroup';
import { Task } from '../../domain/task/task';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

export const task1 = Task.create(
  {
    no: 1,
    name: 'よく使うHTTPヘッダを理解する',
    description:
      'HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を変化させて、情報を「ボディ」で送信する、非常にシンプルな作りです',
    group: TaskGroup.create({
      taskGroup: 'WEBの基礎',
    }),
  },
  new UniqueEntityID('99999999-9999-9999-aaaa-999999999999'),
);
export const task2 = Task.create(
  {
    no: 2,
    name: 'curlとpostmanに慣れる',
    description:
      '何かAPIに不具合が起きた時、動作確認をしたい時、毎回フロントエンドを操作して症状を再現するのは手間です。',
    group: TaskGroup.create({
      taskGroup: 'WEBの基礎',
    }),
  },
  new UniqueEntityID('99999999-9999-9999-bbbb-999999999999'),
);
