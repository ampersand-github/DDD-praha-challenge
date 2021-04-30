import { TaskGroup, TaskGroupEnum } from '../../../domain/task/taskGroup';
import { ParticipantHavingTask } from '../../../domain/task/participantHavingTask';
import { Task } from '../../../domain/task/task';
import { Participant } from '../../../domain/participant/participant/participant';
import { ParticipantName } from '../../../domain/participant/participant/participantName';
import { MailAddress } from '../../../domain/participant/participant/mailAddress';
import {
  EnrolledStatus,
  EnrolledStatusEnum,
} from '../../../domain/participant/participant/enrolledStatus';
import {
  ProgressStatus,
  ProgressStatusEnum,
} from '../../../domain/task/progressStatus';

describe('ParticipantHavingTask', (): void => {
  const participant = Participant.create({
    participantName: ParticipantName.create({participantName: '山口英夫'}),
    mailAddress: MailAddress.create({mailAddress: 'yamaguchi@gmail.com'}),
    enrolledStatus: EnrolledStatus.create({
      enrolledStatus: EnrolledStatusEnum.enrolled,
    }),
  });

  const task1 = Task.create({
    no: 1,
    name: 'よく使うHTTPヘッダを理解する',
    description: 'HTTPは様々な情報をやりとりしますが...',
    group: TaskGroup.create({taskGroup: TaskGroupEnum.webBasic}),
  });

  const task2 = Task.create({
    no: 2,
    name: 'curlとpostmanに慣れる',
    description: '何かAPIに不具合が起きた時、...',
    group: TaskGroup.create({taskGroup: TaskGroupEnum.webBasic}),
  });

  const task3 = Task.create({
    no: 3,
    name: 'リクエストをパースするWEBサーバを作ってみる',
    description: 'OSSのレポジトリにエラーを報告すると、...',
    group: TaskGroup.create({taskGroup: TaskGroupEnum.webBasic}),
  });
  const task4 = Task.create({
    no: 4,
    name: 'aaaa',
    description: 'aaaa、...',
    group: TaskGroup.create({taskGroup: TaskGroupEnum.webBasic}),
  });

  const complete = ProgressStatus.create({
    progressStatus: ProgressStatusEnum.complete,
  });
  const readyForReview = ProgressStatus.create({
    progressStatus: ProgressStatusEnum.readyForReview,
  });
  const notStarted = ProgressStatus.create({
    progressStatus: ProgressStatusEnum.notStarted,
  });

  const statusForEveryTask = new Map<Task, ProgressStatus>([
    [task1, complete],
    [task2, readyForReview],
    [task3, notStarted],
  ]);

  const participantHavingTask = ParticipantHavingTask.create({
    participant: participant,
    statusForEveryTask: statusForEveryTask,
  });

  describe('ifExistTask', () => {
    test('存在するtaskはtrue', () => {
      expect(participantHavingTask.existTask(task1)).toStrictEqual(true);
    });
    test('存在しないタスクはfalse', () => {
      expect(participantHavingTask.existTask(task4)).toStrictEqual(false);
    });
  });

  describe('isComplete', () => {
    test('タスクが完了していたらtrue', () => {
      expect(participantHavingTask.isComplete(task1)).toStrictEqual(true);
    });
    test('タスクが完了していなければfalse', () => {
      expect(participantHavingTask.isComplete(task2)).toStrictEqual(false);
    });
  });

  describe('changeStatus', () => {
    test('task3のステータスをnotStartedからcompleteへ変更する', () => {
      const _ = participantHavingTask.changeStatus(task3, complete);
      expect(_.props.statusForEveryTask.get(task3)).toBe(complete);
    });
    test('存在しないtaskのステータスを変更できない', () => {
      expect(() => {
        participantHavingTask.changeStatus(task4, complete);
      }).toThrow();
    });
    test('完了ステータスの場合は他のステータスに変更できない', () => {
      expect(() => {
        participantHavingTask.changeStatus(task1, readyForReview);
      }).toThrow();
    });
  });

  describe("getTaskFromName", () => {
    test('存在するタスク名からそのTaskクラスを取得する', () => {
      const expected = participantHavingTask.getTaskFromName(
          task1.props.name,
      );
      expect(task1).toBe(expected);
    });
    test('存在しないタスク名からそのTaskクラスを取得できない', () => {
      expect(() => {
        participantHavingTask.getTaskFromName(
            "aaaaaaaaaaaaaaa",
        );
      }).toThrow();
    });
  });
})
