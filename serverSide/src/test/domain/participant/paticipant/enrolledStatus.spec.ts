import {
  EnrolledStatus,
  EnrolledStatusEnum,
} from '../../../../domain/participant/participant/enrolledStatus';

describe('EnrolledStatus', (): void => {
  const active = { enrolledStatus: EnrolledStatusEnum.enrolled };
  test('クラスが生成できること', () => {
    const actual = EnrolledStatus.create(active);
    expect(actual).toBeInstanceOf(EnrolledStatus);
  });

  test('引数で与えた値が取得できること', () => {
    const actual = EnrolledStatus.create(active);
    expect(actual.enrolledStatus).toBe(active.enrolledStatus);
  });
});
