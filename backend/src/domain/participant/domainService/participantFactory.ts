import { Participant } from '../participant';
import { IParticipantRepository } from '../repositoryInterface/IParticipantRepository';
import { ParticipantName } from '../participantName';
import { MailAddress } from '../mailAddress';
import { PersonalInfo } from '../personalInfo';
import { EnrolledStatus, EnrolledStatusEnum } from '../enrolledStatus';
import { ITaskRepository } from '../../task/repositoryInterface/ITaskRepository';
import { Task } from '../../task/task';
import { ProgressStatus, ProgressStatusEnum } from '../progressStatus';
import { ParticipantHavingTaskCollection } from '../participantHavingTaskCollection';
import { ParticipantHavingTask } from '../participantHavingTask';

interface ParticipantServiceProps {
  participantRepository: IParticipantRepository;
  taskRepository: ITaskRepository;
}

interface FactoryProps {
  participantName: string;
  mailAddress: string;
}

export class ParticipantFactory {
  private readonly participantRepo: IParticipantRepository;
  private readonly taskRepo: ITaskRepository;
  public constructor(props: ParticipantServiceProps) {
    this.participantRepo = props.participantRepository;
    this.taskRepo = props.taskRepository;
  }

  private async disallowDuplicatePersonalInfo(personalInfo: PersonalInfo): Promise<void> {
    const result = await this.participantRepo.isExistMailAddress(personalInfo.mailAddress);
    if (result) {
      throw new Error('このメールアドレスは既に存在していますので登録できません。');
    }
  }
  public async factory(props: FactoryProps): Promise<Participant> {
    /*
    ユーザーの新規作成処理
    ユーザーの個人情報を受け取って参加者ドメインオブジェクトを生成する
    ドメインオブジェクトをDBへ登録するのはユースケースであることに注意
     */
    // 個人情報を作成
    const participantNameData = { participantName: props.participantName };
    const participantName = ParticipantName.create(participantNameData);
    const mailAddressData = { mailAddress: props.mailAddress };
    const mailAddress = MailAddress.create(mailAddressData);
    const personalInfo = PersonalInfo.create({
      participantName: participantName,
      mailAddress: mailAddress,
    });
    //
    // 既に参加者である場合はエラー処理
    await this.disallowDuplicatePersonalInfo(personalInfo);
    //
    // 在籍ステータス作成
    const enrolledType = EnrolledStatusEnum.enrolled;
    const enrolledData = { enrolledStatus: enrolledType };
    const enrolled = EnrolledStatus.create(enrolledData);
    //
    // 参加者保有タスクの初期値を作成
    const tasks = await this.taskRepo.findAll();
    const notStartedData = { progressStatus: ProgressStatusEnum.notStarted };
    const notStarted = ProgressStatus.create(notStartedData);
    const participantHavingTasksData = tasks.map((one: Task) => {
      return ParticipantHavingTask.create({ task: one, progressStatus: notStarted });
    });
    const participantHavingTaskCollection = ParticipantHavingTaskCollection.create({
      participantHavingTaskCollection: participantHavingTasksData,
    });
    //
    // 参加者作成
    const data = {
      personalInfo: personalInfo,
      enrolledStatus: enrolled,
      participantHavingTaskCollection: participantHavingTaskCollection,
    };
    return Participant.create(data);
  }
}
