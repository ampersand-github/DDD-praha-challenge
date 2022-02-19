import { ParticipantHavingTaskCollection } from '../../../../../domain/participant/participantHavingTaskCollection';

import { Task } from '../../../../../domain/task/task';
import { ParticipantHavingTask } from '../../../../../domain/participant/participantHavingTask';
import { ProgressStatus } from '../../../../../domain/participant/progressStatus';
import { UniqueEntityID } from '../../../../../domain/shared/UniqueEntityID';
import {
  ParticipantHavingTask as PrismaParticipantHavingTask,
  Task as PrismaTask,
} from '@prisma/client';
import { IFromPrismaToTaskConverter } from './ToTaskConverter';
export interface IFromPrismaHavingTaskCollectionConverter {
  do(
    data: PrismaParticipantHavingTask[],
    allPrismaTask: PrismaTask[],
  ): ParticipantHavingTaskCollection;
}

export class ToHavingTaskCollectionConverter implements IFromPrismaHavingTaskCollectionConverter {
  private readonly toTask: IFromPrismaToTaskConverter;

  public constructor(toTask: IFromPrismaToTaskConverter) {
    this.toTask = toTask;
  }

  public do(
    data: PrismaParticipantHavingTask[],
    allPrismaTask: PrismaTask[],
  ): ParticipantHavingTaskCollection {
    const allTask = allPrismaTask.map((one) => this.toTask.do(one));
    const participantHavingTaskCollectionData: ParticipantHavingTask[] = data.map(
      (one: PrismaParticipantHavingTask) => {
        const progressStatus = ProgressStatus.create({ progressStatus: one.taskProgress });
        const taskId = new UniqueEntityID(one.taskId);
        const task = allTask.find((one: Task) => one.id.equals(taskId));
        return ParticipantHavingTask.create({ task: task, progressStatus: progressStatus });
      },
    );
    return ParticipantHavingTaskCollection.create({
      participantHavingTaskCollection: participantHavingTaskCollectionData,
    });
  }
}
