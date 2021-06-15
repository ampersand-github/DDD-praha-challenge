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
  describe('changeStatus', (): void => {
    test('[正常]ステータスを変更できる レビュー待ち -> 完了', () => {
      const readyForReview = ProgressStatusEnum.readyForReview;
      const progressData = { progressStatus: readyForReview };
      const progressStatus = ProgressStatus.create(progressData);
      const actual = progressStatus.changeStatus(ProgressStatusEnum.complete);
      expect(actual.progressStatus).toBe(ProgressStatusEnum.complete);
    });
    test('[異常]完了ステータスを変更できない', () => {
      const complete = ProgressStatusEnum.complete;
      const progressData = { progressStatus: complete };
      const actual = ProgressStatus.create(progressData);

      expect(() => {
        actual.changeStatus(ProgressStatusEnum.readyForReview);
      }).toThrowError('完了ステータスになっているタスクは変更できません');
    });
  });
});
