import { ParticipantName } from '../../../../domain/participant/participant/participantName';
import { ParticipantId } from '../../../../domain/participant/participant/participantId';

describe('ParticipantName', (): void => {

  test('引数で与えた名前が取得できること', () => {
    const goodName = { participantName: '堺均' };
    const actual = ParticipantName.create(goodName);
    expect(actual.props.participantName).toBe(goodName.participantName);
  });

  test('入力文字数が1字なので弾かれる', () => {
    const badName = { participantName: '堺' };
    expect(() => {
      ParticipantName.create(badName);
    }).toThrow();
  });
});
