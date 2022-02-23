/* eslint-disable */

import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../../../domain/participant/participant';
import { PersonalInfo } from '../../../domain/participant/personalInfo';
import { EnrolledStatus } from '../../../domain/participant/enrolledStatus';
import { Task } from '../../../domain/task/task';
import { ParticipantHavingTaskCollectionDTO } from '../../../usecase/participant/DTO/participantHavingTasksDTO';

export class InMemoryParticipantRepository implements IParticipantRepository {
  public create(participant: Participant): Promise<Participant> {
    return Promise.resolve(undefined);
  }

  public delete(participant: Participant): Promise<number> {
    return Promise.resolve(undefined);
  }

  public findOne(participantId: string): Promise<Participant | null> {
    return Promise.resolve(undefined);
  }

  public isExistMailAddress(mailAddress: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public updateEnrolledStatus(participant: Participant): Promise<EnrolledStatus> {
    return Promise.resolve(undefined);
  }

  public updateParticipantHavingTasks(
    participant: Participant,
  ): Promise<ParticipantHavingTaskCollectionDTO> {
    return Promise.resolve(undefined);
  }

  public updatePersonalInfo(participant: Participant): Promise<PersonalInfo> {
    return Promise.resolve(undefined);
  }

  deleteUserHavingTasksByTask(task: Task): Promise<number> {
    return Promise.resolve(0);
  }

  findAll(): Promise<Participant[]> {
    return Promise.resolve([]);
  }

  update(participant: Participant): Promise<Participant> {
    return Promise.resolve(undefined);
  }
}
