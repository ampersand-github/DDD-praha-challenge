import { EnrolledStatus, EnrolledStatusEnum } from '../domain/participant/enrolledStatus';

const dummyEnrolledData = { enrolledStatus: EnrolledStatusEnum.enrolled };
const dummyRecessData = { enrolledStatus: EnrolledStatusEnum.recess };
const dummyWithdrawalData = { enrolledStatus: EnrolledStatusEnum.withdrawal };

export const dummyEnrolled = EnrolledStatus.create(dummyEnrolledData);
export const dummyRecess = EnrolledStatus.create(dummyRecessData);
export const dummyWithdrawal = EnrolledStatus.create(dummyWithdrawalData);
