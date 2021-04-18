import { v4 as uuid } from 'uuid';
export const participantHavingTaskDataSource = (
  taskDataSource,
  participantDataSource,
) => {
  return [
    {
      participantHavingTaskId: uuid(),
      taskId: taskDataSource[0].taskId,
      participantId: participantDataSource[0].participantId,
    },
  ];
};
