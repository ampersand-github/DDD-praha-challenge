import { ParticipantName } from '../../../../domain/participant/participant/participantName';

describe('ParticipantName', (): void => {
  test('引数で与えた名前が取得できること', () => {
    const goodName = { participantName: 'A' };
    const actual = ParticipantName.create(goodName);

    expect(actual.values.participantName).toBe(goodName.participantName);
  });

  test('入力文字数が0字なので弾かれる', () => {
    const badName = { participantName: '' };
    expect(() => {
      ParticipantName.create(badName);
    }).toThrow();
  });
});
