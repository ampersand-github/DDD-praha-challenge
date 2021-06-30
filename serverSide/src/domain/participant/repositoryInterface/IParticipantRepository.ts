import { PersonalInfo } from '../personalInfo';
import { Participant } from '../participant';
import { ParticipantHavingTasks } from '../participantHavingTasks';
import { EnrolledStatus } from '../enrolledStatus';
import { Task } from '../../task/task';

export interface IParticipantRepository {
  findAll(): Promise<PersonalInfo[]>;
  // todo 実装するときにparticipantIdをParticipantに入れ込むことを忘れずに
  findOne(participantId: string): Promise<Participant | null>;
  isExistMailAddress(mailAddress: string): Promise<boolean>;
  create(participant: Participant): Promise<Participant>;
  updatePersonalInfo(participant: Participant): Promise<PersonalInfo>;
  updateParticipantHavingTasks(participant: Participant): Promise<ParticipantHavingTasks>;
  updateEnrolledStatus(participant: Participant): Promise<EnrolledStatus>;
  //
  // todo DBの参加者の一部の項目を個人情報テーブルに分離すること
  delete(participant: Participant): Promise<number>; // numberは削除件数
  deleteUserHavingTasksByTask(task: Task): Promise<number>; // numberは削除件数
}
