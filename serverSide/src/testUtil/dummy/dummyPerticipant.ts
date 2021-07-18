import { UniqueEntityID } from '../../domain/shared/UniqueEntityID';
import { Participant } from '../../domain/participant/participant';
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
import {
  dummyParticipantHavingTasks1,
  dummyParticipantHavingTasks1update,
  dummyParticipantHavingTasks2,
  dummyParticipantHavingTasks3,
  qsDummyParticipantHavingTasks1,
  qsDummyParticipantHavingTasks2,
  qsDummyParticipantHavingTasks3,
} from './dummyParticipantHavingTasks';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 参加者
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const dummyParticipantData1 = {
  personalInfo: dummyPersonalIfo1,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: dummyParticipantHavingTasks1,
};

const dummyParticipantData2 = {
  personalInfo: dummyPersonalIfo2,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: dummyParticipantHavingTasks2,
};

const dummyParticipantData3 = {
  personalInfo: dummyPersonalIfo3,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: dummyParticipantHavingTasks3,
};

const dummyParticipantData4 = {
  personalInfo: dummyPersonalIfo4,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: dummyParticipantHavingTasks1,
};

const dummyParticipantData5 = {
  personalInfo: dummyPersonalIfo5,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: dummyParticipantHavingTasks1,
};
const dummyParticipantData6 = {
  personalInfo: dummyPersonalIfo6,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: dummyParticipantHavingTasks1,
};
const dummyParticipantData7 = {
  personalInfo: dummyPersonalIfo7,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: dummyParticipantHavingTasks1,
};
const dummyParticipantData1update = {
  personalInfo: dummyPersonalIfo1,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: dummyParticipantHavingTasks1update,
};
//
const qsDummyParticipantData1 = {
  personalInfo: dummyPersonalIfo1,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: qsDummyParticipantHavingTasks1,
};
const qsDummyParticipantData2 = {
  personalInfo: dummyPersonalIfo2,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: qsDummyParticipantHavingTasks2,
};
const qsDummyParticipantData3 = {
  personalInfo: dummyPersonalIfo3,
  enrolledStatus: dummyEnrolled,
  participantHavingTaskCollection: qsDummyParticipantHavingTasks3,
};
//
export const dummyParticipantId = new UniqueEntityID('99999999-9999-part-4444-99999999999s');
export const dummyParticipant1 = Participant.create(dummyParticipantData1, dummyParticipantId);
export const dummyParticipant2 = Participant.create(dummyParticipantData2, dummyParticipantId);
export const dummyParticipant3 = Participant.create(dummyParticipantData3);
export const dummyParticipant4 = Participant.create(dummyParticipantData4);
export const dummyParticipant5 = Participant.create(dummyParticipantData5);
export const dummyParticipant6 = Participant.create(dummyParticipantData6);
export const dummyParticipant7 = Participant.create(dummyParticipantData7);
export const dummyParticipant1Update = Participant.create(
  dummyParticipantData1update,
  dummyParticipantId,
);
// queryService用
export const qsDummyParticipant1 = Participant.create(qsDummyParticipantData1);
export const qsDummyParticipant2 = Participant.create(qsDummyParticipantData2);
export const qsDummyParticipant3 = Participant.create(qsDummyParticipantData3);
export const qsDummyParticipant4 = Participant.create(dummyParticipantData4);
export const qsDummyParticipant5 = Participant.create(dummyParticipantData5);
export const qsDummyParticipant6 = Participant.create(dummyParticipantData6);
export const qsDummyParticipant7 = Participant.create(dummyParticipantData7);
