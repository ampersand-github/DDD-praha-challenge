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
    {
      participantHavingTaskId: uuid(),
      taskId: taskDataSource[1].taskId,
      participantId: participantDataSource[0].participantId,
    },
    {
      participantHavingTaskId: uuid(),
      taskId: taskDataSource[2].taskId,
      participantId: participantDataSource[0].participantId,
    },
    {
      participantHavingTaskId: uuid(),
      taskId: taskDataSource[3].taskId,
      participantId: participantDataSource[0].participantId,
    },

    {
      participantHavingTaskId: uuid(),
      taskId: taskDataSource[0].taskId,
      participantId: participantDataSource[1].participantId,
    },
    {
      participantHavingTaskId: uuid(),
      taskId: taskDataSource[1].taskId,
      participantId: participantDataSource[1].participantId,
    },
    {
      participantHavingTaskId: uuid(),
      taskId: taskDataSource[2].taskId,
      participantId: participantDataSource[1].participantId,
    },
  ];
};
