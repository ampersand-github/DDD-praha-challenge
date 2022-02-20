import { ProgressStatus, ProgressStatusEnum } from '../../../domain/participant/progressStatus';

describe('ProgressStatus', (): void => {
  describe('constructor', (): void => {
    test('[正常]クラスを生成できる', () => {
      const complete = ProgressStatusEnum.complete;
      const progressData = { progressStatus: complete };
      const actual = ProgressStatus.create(progressData);
      expect(actual.progressStatus).toBe(actual.progressStatus);
    });
    test('[異常]不正な値を与えてエラーになる', () => {
      const progressData = { progressStatus: '不正な値' };
      expect(() => {
        ProgressStatus.create(progressData);
      }).toThrowError('進捗ステータス名が不正です。');
    });
  });
});
