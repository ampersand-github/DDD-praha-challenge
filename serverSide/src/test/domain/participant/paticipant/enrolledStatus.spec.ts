import {
  EnrolledStatus,
  EnrolledStatusType,
} from '../../../../domain/participant/participant/enrolledStatus';

describe('EnrolledStatus', (): void => {
  const active = { enrolledStatus: '在籍中' as EnrolledStatusType };
  // const recess = { enrolledStatus: "休会中"as EnrolledStatusType };
  // const withdrawal = { enrolledStatus: "退会済" as EnrolledStatusType};

  test('引数で与えた値が取得できるこ', () => {
    const actual = EnrolledStatus.create(active);
    expect(actual.props.enrolledStatus).toBe(active.enrolledStatus);
  });
});
