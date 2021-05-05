import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Participant } from '../../../../domain/participant/participant/participant';
import { ParticipantName } from '../../../../domain/participant/participant/participantName';
import { MailAddress } from '../../../../domain/participant/participant/mailAddress';
import {
  EnrolledStatus,
  EnrolledStatusEnum,
} from '../../../../domain/participant/participant/enrolledStatus';

describe('Participant', (): void => {
  const id = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
  const enrolled = EnrolledStatusEnum.enrolled;
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const name = ParticipantName.create({ participantName: '堺均' });
  const email = MailAddress.create({ mailAddress: 'aaa@gmail.com' });
  const status = EnrolledStatus.create({ enrolledStatus: enrolled });
  const data = {
    participantName: name,
    mailAddress: email,
    enrolledStatus: status,
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const name2 = ParticipantName.create({ participantName: '山田太郎' });
  const email2 = MailAddress.create({ mailAddress: 'yamada@gmail.com' });
  const status2 = EnrolledStatus.create({ enrolledStatus: enrolled });
  const data2 = {
    participantName: name2,
    mailAddress: email2,
    enrolledStatus: status2,
  };

  test('参加者idを引数で指定して、その値が取得できること', () => {
    const actual = Participant.create(data, id);
    expect(actual.id).toBe(id);
  });

  test('idを使って等価比較ができること', () => {
    const actual1 = Participant.create(data, id);
    const actual2 = Participant.create(data2, id);
    expect(actual1.equals(actual2)).toBe(true);
  });

  test('ステータス変更ができること', () => {
    const actual = Participant.create(data);
    const expected = EnrolledStatusEnum.recess;
    actual.changeEnrolledStatus(expected);
    expect(actual.values.enrolledStatus).toBe(expected);
  });
});
