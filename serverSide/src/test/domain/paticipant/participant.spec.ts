import { dummyParticipant1 } from '../../../testUtil/dummy/dummyPerticipant';
import { dummyRecess } from '../../../testUtil/dummy/dummyEnrolledStatus';
import { EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';
import { dummyTask1, dummyTask2 } from '../../../testUtil/dummy/dummyTask';
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
      const actual: Participant = dummyParticipant1.changeProgressStatus(dummyTask2, complete);
      const result = actual.getStatusFromTask(dummyTask2);
      expect(result).toBe(complete);
    });
  });

  describe('deleteByTask', (): void => {
    test('[正常]', () => {
      expect(dummyParticipant1.participantHavingTaskCollection.length).toBe(3);
      dummyParticipant1.deleteByTask([dummyTask1]);
      expect(dummyParticipant1.participantHavingTaskCollection.length).toBe(2);
    });
  });
});
