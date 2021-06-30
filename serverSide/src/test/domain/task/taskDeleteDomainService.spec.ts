import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { TaskDeleteDomainService } from '../../../domain/task/taskDeleteDomainService';

describe('TaskDeleteDomainService', () => {
  const participantRepository = new InMemoryParticipantRepository();
  const taskRepository = new InMemoryTaskRepository();
  const taskDeleteDomainService = new TaskDeleteDomainService(
    taskRepository,
    participantRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // todo リポジトリをモックしてのテストが面倒くさいというか、モックしたテストが意味ないので、リポジトリ実装時にテストする
  describe('do', (): void => {
    test('[正常]削除できる', async () => {
      // データ作成
      // 結果確認
    });
    test('[異常]引数のタスクグループが存在しないタスクグループ', async () => {
      // データ作成
      // 結果確認
    });
    test('[正常]削除対象のタスクグループに紐づくタスクが存在しない場合でも正常に動作する', async () => {
      // データ作成
      // 結果確認
    });
    test('[正常]削除対象のタスクに紐づく参加者保有課題が存在しない場合でも正常に動作する', async () => {
      // データ作成
      // 結果確認
    });
  });
});
