/* eslint-disable */

import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../../../domain/participant/participant';
import { PersonalInfo } from '../../../domain/participant/personalInfo';
import { ParticipantHavingTasks } from '../../../domain/participant/participantHavingTasks';
import { EnrolledStatus } from '../../../domain/participant/enrolledStatus';
import { Task } from '../../../domain/task/task';

export class InMemoryParticipantRepository implements IParticipantRepository {

  public create(participant: Participant): Promise<Participant> {
    return Promise.resolve(undefined);
  }


  public delete(participant: Participant): Promise<number> {
    return Promise.resolve(undefined);
  }

  public findAll(): Promise<PersonalInfo[]> {
    return Promise.resolve([]);
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

  public updateParticipantHavingTasks(participant: Participant): Promise<ParticipantHavingTasks> {
    return Promise.resolve(undefined);
  }

  public updatePersonalInfo(participant: Participant): Promise<PersonalInfo> {
    return Promise.resolve(undefined);
  }

  deleteUserHavingTasksByTask(task: Task): Promise<number> {
    return Promise.resolve(0);
  }
}
