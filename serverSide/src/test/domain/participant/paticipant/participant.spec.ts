import { Participant } from '../../../../domain/participant/participant/participant';
import { EnrolledStatusEnum } from '../../../../domain/participant/participant/enrolledStatus';
import {
  dummyData1,
  dummyId,
  participant1,
  participant2,
  participant3,
} from '../../dummyData/participantDummyData';

describe('Participant', (): void => {
  test('idを指定してクラスを作成し、そのクラスのidを取得できること(participant)', () => {
    expect(participant1.id).toBe(dummyId);
  });

  describe('equals', () => {
    test('等価比較ができること', () => {
      expect(participant1.equals(participant2)).toBe(true);
    });

    test('異なるidによる等価比較で等価と判定されないこと', () => {
      expect(participant1.equals(participant3)).toBe(false);
    });
  });
  test('ステータス変更ができること', () => {
    const actual = Participant.create(dummyData1);
    const expected = EnrolledStatusEnum.recess;
    actual.changeEnrolledStatus(expected);
    expect(actual.enrolledStatus).toBe(expected);
  });
});
