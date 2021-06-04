import {
  EnrolledStatus,
  EnrolledStatusEnum,
} from '../domain/participant/enrolledStatus';

export const dummyEnrolledData = {
  enrolledStatus: EnrolledStatusEnum.enrolled,
};
export const dummyEnrolled = EnrolledStatus.create(dummyEnrolledData);
