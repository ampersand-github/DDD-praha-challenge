import { ParticipantName } from '../../../domain/participant/participantName';

describe('ParticipantName', (): void => {
  describe('constructor', () => {
    test('[正常]引数で与えた名前が取得できること', () => {
      const goodName = { participantName: 'A' };
      const actual = ParticipantName.create(goodName);
      expect(actual.participantName).toBe(goodName.participantName);
    });

    test('[異常]入力文字数が0字なので弾かれる', () => {
      const badName = { participantName: '' };
      expect(() => {
        ParticipantName.create(badName);
      }).toThrowError('名前を入力してください。');
    });
    test('[異常]入力文字がnullなので弾かれる', () => {
      const badName = { participantName: null };
      expect(() => {
        ParticipantName.create(badName);
      }).toThrowError('名前を入力してください。');
    });
  });
});
