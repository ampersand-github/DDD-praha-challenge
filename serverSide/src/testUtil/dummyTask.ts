import { Task } from '../domain/task/task';
import { TaskGroup, TaskGroupEnum } from '../domain/taskGroup/taskGroup';
import { UniqueEntityID } from '../domain/shared/UniqueEntityID';

export const dummyTask1 = Task.create(
  {
    no: 1,
    name: 'よく使うHTTPヘッダを理解する',
    description:
      'HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を変化させて、情報を「ボディ」で送信する、非常にシンプルな作りです',
    group: TaskGroup.create({
      taskGroup: 'WEBの基礎',
    }),
  },
  new UniqueEntityID('99999999-9999-task-aaa0-999999999999'),
);
export const dummyTask2 = Task.create(
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

export const dummyTask3 = Task.create({
  no: 3,
  name: 'リクエストをパースするWEBサーバを作ってみる',
  description: 'OSSのレポジトリにエラーを報告すると、...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
});

export const dummyTask4 = Task.create({
  no: 4,
  name: 'aaaa',
  description: 'aaaa、...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
});
