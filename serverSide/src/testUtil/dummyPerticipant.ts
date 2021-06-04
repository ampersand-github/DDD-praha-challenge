import { UniqueEntityID } from '../domain/shared/UniqueEntityID';
import { Participant } from '../domain/participant/participant';
import {
  dummyPersonalIfo1,
  dummyPersonalIfo2,
  dummyPersonalIfo3,
  dummyPersonalIfo4,
  dummyPersonalIfo5,
  dummyPersonalIfo6,
  dummyPersonalIfo7,
} from './dummyPersonalInfo';
import { dummyEnrolled } from './dummyEnrolledStatus';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 参加者
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let participantHavingTask1;
const dummyParticipantData1 = {
  personalInfo: dummyPersonalIfo1,
  enrolledStatus: dummyEnrolled,
  participantHavingTasks: participantHavingTask1,
};

const dummyParticipantData2 = {
  personalInfo: dummyPersonalIfo2,
  enrolledStatus: dummyEnrolled,
  participantHavingTasks: participantHavingTask1,
};

const dummyParticipantData3 = {
  personalInfo: dummyPersonalIfo3,
  enrolledStatus: dummyEnrolled,
  participantHavingTasks: participantHavingTask1,
};

const dummyParticipantData4 = {
  personalInfo: dummyPersonalIfo4,
  enrolledStatus: dummyEnrolled,
  participantHavingTasks: participantHavingTask1,
};

const dummyParticipantData5 = {
  personalInfo: dummyPersonalIfo5,
  enrolledStatus: dummyEnrolled,
  participantHavingTasks: participantHavingTask1,
};
const dummyParticipantData6 = {
  personalInfo: dummyPersonalIfo6,
  enrolledStatus: dummyEnrolled,
  participantHavingTasks: participantHavingTask1,
};
const dummyParticipantData7 = {
  personalInfo: dummyPersonalIfo7,
  enrolledStatus: dummyEnrolled,
  participantHavingTasks: participantHavingTask1,
};

//
export const dummyParticipantId = new UniqueEntityID(
  '99999999-9999-part-4444-99999999999s',
);
export const dummyParticipant1 = Participant.create(
  dummyParticipantData1,
  dummyParticipantId,
);
export const dummyParticipant2 = Participant.create(
  dummyParticipantData2,
  dummyParticipantId,
);
export const dummyParticipant3 = Participant.create(dummyParticipantData3);
export const dummyParticipant4 = Participant.create(dummyParticipantData4);
export const dummyParticipant5 = Participant.create(dummyParticipantData5);
export const dummyParticipant6 = Participant.create(dummyParticipantData6);
export const dummyParticipant7 = Participant.create(dummyParticipantData7);
