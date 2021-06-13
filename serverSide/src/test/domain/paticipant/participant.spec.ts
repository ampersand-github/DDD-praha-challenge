import { dummyParticipant1 } from '../../../testUtil/dummyPerticipant';
import { dummyRecess } from '../../../testUtil/dummyEnrolledStatus';
import { EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';
import { dummyTask1 } from '../../../testUtil/dummyTask';
import { ProgressStatusEnum } from '../../../domain/participant/progressStatus';
import { Participant } from '../../../domain/participant/participant';

describe('Participant', (): void => {
  describe('changeMailAddress', (): void => {
    test('[正常]メールアドレスの変更ができること', () => {
      const actual = dummyParticipant1.changeMailAddress('aaa@gmail.com');
      expect(actual.mailAddress).toBe('aaa@gmail.com');
    });
  });
  describe('changeParticipantName', (): void => {
    test('[正常]参加者の名前が変更できること', () => {
      const actual = dummyParticipant1.changeParticipantName('田中太郎');
      expect(actual.participantName).toBe('田中太郎');
    });
  });

  describe('changeEnrolledStatus', (): void => {
    test('[正常]ステータス変更ができること', () => {
      const recess = EnrolledStatusEnum.recess;
      const result = dummyParticipant1.changeEnrolledStatus(recess);
      expect(result.enrolledStatus).toBe(dummyRecess.enrolledStatus);
    });
  });
  describe('changeParticipantHavingTasks', (): void => {
    test('[正常]進捗ステータスが変更ができること', () => {
      const complete = ProgressStatusEnum.complete;
      const actual: Participant = dummyParticipant1.changeProgressStatus(dummyTask1, complete);
      const result = actual.participantHavingTasks.statusAndTasks.get(dummyTask1).progressStatus;
      expect(result).toBe(complete);
    });
  });
});

/*
  test('idを指定してクラスを作成し、そのクラスのidを取得できること(participant)', () => {
    expect(dummyParticipant1.id).toBe(dummyParticipantId);
  });

  describe('equals', () => {
    test('等価比較ができること', () => {
      expect(dummyParticipant1.equals(dummyParticipant2)).toBe(true);
    });

    test('異なるidによる等価比較で等価と判定されないこと', () => {
      expect(dummyParticipant1.equals(dummyParticipant3)).toBe(false);
    });
  });

 */
