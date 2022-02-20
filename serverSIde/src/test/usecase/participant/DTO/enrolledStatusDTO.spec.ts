import { EnrolledStatusDTO } from '../../../../usecase/participant/DTO/enrolledStatusDTO';
import { dummyParticipant1 } from '../../../../testUtil/dummy/dummyPerticipant';
import { EnrolledStatusEnum } from '../../../../domain/participant/enrolledStatus';

describe('EnrolledStatusDTO', (): void => {
  describe('constructor', (): void => {
    test('[正常]返り値が取得できる', () => {
      expect(new EnrolledStatusDTO(dummyParticipant1).enrolledStatus).toBe(
        EnrolledStatusEnum.enrolled,
      );
    });
  });
});
