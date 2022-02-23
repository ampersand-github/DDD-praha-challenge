import { EnrolledStatus, EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';

describe('EnrolledStatus', (): void => {
  describe('constructor', (): void => {
    test('[正常]クラスを生成できる', () => {
      const enrolledData = { enrolledStatus: EnrolledStatusEnum.enrolled };
      const actual = EnrolledStatus.create(enrolledData);
      expect(actual.enrolledStatus).toBe(enrolledData.enrolledStatus);
    });
    test('[異常]不正な値を与えてエラーになる', () => {
      const data = { enrolledStatus: '不正な値' };
      expect(() => {
        EnrolledStatus.create(data);
      }).toThrowError('タスクグループ名が不正です。');
    });
  });
});
