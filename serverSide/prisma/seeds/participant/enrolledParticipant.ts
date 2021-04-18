import { v4 as uuid } from 'uuid';

export const enrolledParticipantDataSource = (participantDataSource) => {
  return [
    {
      enrolledParticipantId: uuid(),
      enrolledStatus: '在籍中',
      participantId: participantDataSource[0].participantId,
    },
  ];
};
