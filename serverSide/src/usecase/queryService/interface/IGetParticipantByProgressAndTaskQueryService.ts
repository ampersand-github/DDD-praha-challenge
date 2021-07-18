import { ProgressStatus } from '../../../domain/participant/progressStatus';
import { Task } from '../../../domain/task/task';
import { Participant } from '../../../domain/participant/participant';

// 最低１つ以上のTaskが必要
export type AtLeastOneTask = [Task, ...Task[]];
export interface IGetParticipantByProgressAndTaskQueryService {
  do(
    taskList: AtLeastOneTask,
    progressStatus: ProgressStatus,
    take: number,
    page: number,
  ): Promise<Participant[]>;
}
