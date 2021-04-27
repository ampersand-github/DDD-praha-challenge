import { ParticipantName } from '../../../../domain/participant/participant/participantName';

describe('ParticipantName', (): void => {
  const oneName = { participantName: '堺' };
  const tweName = { participantName: '堺均' };

  test('good pattern', () => {
    expect(ParticipantName.create(tweName).value).toBe(tweName.participantName);
  });

  test('bad pattern - 入力文字数が1字なので弾かれる - ', () => {
    expect(() => {
      ParticipantName.create(oneName);
    }).toThrow();
  });
});
