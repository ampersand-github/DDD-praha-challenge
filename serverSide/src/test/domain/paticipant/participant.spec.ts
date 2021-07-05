import { dummyParticipant1 } from '../../../testUtil/dummy/dummyPerticipant';
import { dummyRecess } from '../../../testUtil/dummy/dummyEnrolledStatus';
import { EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';
import { dummyTask2 } from '../../../testUtil/dummy/dummyTask';
import { ProgressStatusEnum } from '../../../domain/participant/progressStatus';

describe('Participant', (): void => {
  describe('changeMailAddress', (): void => {
    test('[正常]メールアドレスの変更ができること', () => {
      dummyParticipant1.changeMailAddress('aaa@gmail.com');
      expect(dummyParticipant1.mailAddress).toBe('aaa@gmail.com');
    });
  });
  describe('changeParticipantName', (): void => {
    test('[正常]参加者の名前が変更できること', () => {
      dummyParticipant1.changeParticipantName('田中太郎');
      expect(dummyParticipant1.participantName).toBe('田中太郎');
    });
  });

  describe('changeEnrolledStatus', (): void => {
    test('[正常]ステータス変更ができること', () => {
      const recess = EnrolledStatusEnum.recess;
      dummyParticipant1.changeEnrolledStatus(recess);
      expect(dummyParticipant1.enrolledStatus).toBe(dummyRecess.enrolledStatus);
    });
  });
  describe('changeParticipantHavingTasks', (): void => {
    test('[正常]進捗ステータスが変更ができること', () => {
      const complete = ProgressStatusEnum.complete;
      dummyParticipant1.changeProgressStatus(dummyTask2, complete);
      const result = dummyParticipant1.getStatusFromTask(dummyTask2);
      expect(result).toBe(complete);
    });
  });
});
