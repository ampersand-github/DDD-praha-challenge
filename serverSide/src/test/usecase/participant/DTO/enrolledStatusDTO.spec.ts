import { EnrolledStatusDTO } from '../../../../usecase/participant/DTO/enrolledStatusDTO';
import { dummyEnrolled } from '../../../../testUtil/dummy/dummyEnrolledStatus';

describe('EnrolledStatusDTO', (): void => {
  describe('constructor', (): void => {
    test('[正常]返り値が取得できる', () => {
      expect(new EnrolledStatusDTO(dummyEnrolled).enrolledStatus).toBe('在籍中');
    });
  });
});
