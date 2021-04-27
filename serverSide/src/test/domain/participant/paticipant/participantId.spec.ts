import { ParticipantId } from '../../../../domain/participant/participant/participantId';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

describe('ParticipantId', (): void => {

  test('引数で指定したidがクラスのidになっていること', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    expect(ParticipantId.create(uuid).id).toBe(uuid);
  });
  test('同じidなら等価にこと', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    const actual = ParticipantId.create(uuid);
    const except = ParticipantId.create(uuid);
    expect(actual.equals(except)).toBe(true);
  });
  test('異なるIDでは等価にならないこと', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    const actual = ParticipantId.create(uuid);
    const uuid2 = new UniqueEntityID('99999999-9999-9999-9999-999999999998');
    const except = ParticipantId.create(uuid2);
    expect(actual.equals(except)).toBe(false);
  });
});
