import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';
import { Participant } from '../../../domain/participant/participant';
import { PersonalInfo } from '../../../domain/participant/personalInfo';
import { ParticipantHavingTasks } from '../../../domain/participant/participantHavingTasks';
import { EnrolledStatus } from '../../../domain/participant/enrolledStatus';
import { Task } from '../../../domain/task/task';

export class InMemoryParticipantRepository implements IParticipantRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public create(participant: Participant): Promise<Participant> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete(participant: Participant): Promise<number> {
    return Promise.resolve(undefined);
  }

  public findAll(): Promise<PersonalInfo[]> {
    return Promise.resolve([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public findOne(participantId: string): Promise<Participant | null> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isExistMailAddress(mailAddress: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updateEnrolledStatus(participant: Participant): Promise<EnrolledStatus> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updateParticipantHavingTasks(participant: Participant): Promise<ParticipantHavingTasks> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updatePersonalInfo(participant: Participant): Promise<PersonalInfo> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public deleteByTask(task: Task): Promise<number> {
    return Promise.resolve(0);
  }
}
