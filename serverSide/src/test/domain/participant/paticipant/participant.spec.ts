import { ParticipantId } from '../../../../domain/participant/participant/participantId';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Participant } from '../../../../domain/participant/participant/participant';
import { ParticipantName } from '../../../../domain/participant/participant/participantName';
import { MailAddress } from '../../../../domain/participant/participant/mailAddress';

describe('Participant', (): void => {
  const uniqueEntityID = new UniqueEntityID(
    'c8b93182-3993-4543-8991-0be6dc9fe8d9',
  );
  const id = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
  const uuid = ParticipantId.create(uniqueEntityID);
  const name = ParticipantName.create({ participantName: '堺均' });
  const email = MailAddress.create({ mailAddress: 'aaa@gmail.com' });
  const name2 = ParticipantName.create({ participantName: '堺ss均' });
  const email2 = MailAddress.create({ mailAddress: 'asssaa@gmail.com' });
  //
  const data = {
    participantName: name,
    mailAddress: email,
  };
  const data2 = {
    participantName: name2,
    mailAddress: email2,
  };

  test('good pattern - idを入れてあげるパターン -', () => {
    const good = Participant.create(data, id);
    expect(good.participantId.id).toBe(id);
  });
  test('good pattern2 - idが等しい -', () => {
    const good = Participant.create(data, id);
    const good2 = Participant.create(data2, id);
    expect(good.equals(good2)).toBe(true);
  });
});
