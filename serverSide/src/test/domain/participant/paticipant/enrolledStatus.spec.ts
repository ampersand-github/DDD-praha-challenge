import {
  EnrolledStatus,
  EnrolledStatusEnum,
} from '../../../../domain/participant/participant/enrolledStatus';

describe('EnrolledStatus', (): void => {
  const active = { enrolledStatus: EnrolledStatusEnum.enrolled };

  test('引数で与えた値が取得できるこ', () => {
    const actual = EnrolledStatus.create(active);
    expect(actual.props.enrolledStatus).toBe(active.enrolledStatus);
  });
});
