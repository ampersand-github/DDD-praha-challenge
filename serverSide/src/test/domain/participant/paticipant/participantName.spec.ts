import { ParticipantName } from '../../../../domain/participant/participant/participantName';

describe('ParticipantName', (): void => {
  test('クラスが生成できること', () => {
    const goodName = { participantName: 'A' };
    const actual = ParticipantName.create(goodName);
    expect(actual).toBeInstanceOf(ParticipantName);
  });

  test('引数で与えた名前が取得できること', () => {
    const goodName = { participantName: 'A' };
    const actual = ParticipantName.create(goodName);
    expect(actual.participantName).toBe(goodName.participantName);
  });

  test('入力文字数が0字なので弾かれる', () => {
    const badName = { participantName: '' };
    expect(() => {
      ParticipantName.create(badName);
    }).toThrowError('名前をフルネームで入力してください。');
  });
});
