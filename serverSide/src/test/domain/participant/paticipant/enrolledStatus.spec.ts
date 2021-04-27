import {
  EnrolledStatus,
  EnrolledStatusType,
} from '../../../../domain/participant/participant/enrolledStatus';

describe('EnrolledStatus', (): void => {
  const active = { enrolledStatus: '在籍中' as EnrolledStatusType };
  // const recess = { enrolledStatus: "休会中"as EnrolledStatusType };
  // const withdrawal = { enrolledStatus: "退会済" as EnrolledStatusType};

  test('good pattern', () => {
    expect(EnrolledStatus.create(active).value).toBe(active.enrolledStatus);
  });
});
