import { v4 as uuid } from 'uuid';

export const enrolledParticipantDataSource = (participantDataSource) => {
  return [
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[0].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[1].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[2].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[3].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[4].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[5].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[6].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[7].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[8].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[9].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[10].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[11].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[12].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[13].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[14].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[15].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[16].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[17].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[18].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '休会中',
      participantId: participantDataSource[19].participantId,
    },
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '退会済',
      participantId: participantDataSource[20].participantId,
    },
  ];
};
