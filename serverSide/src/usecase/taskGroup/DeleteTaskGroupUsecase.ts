import { ITaskGroupRepository } from '../../Interface/repository/ITaskGroupRepository';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

interface DeleteTaskGroupUsecaseProps {
  id: string;
}

export class DeleteTaskGroupUsecase {
  private readonly repo: ITaskGroupRepository;

  public constructor(repository: ITaskGroupRepository) {
    this.repo = repository;
  }

  public async do(props: DeleteTaskGroupUsecaseProps): Promise<number> {
    const id = new UniqueEntityID(props.id);
    // todo task,ユーザー保有課題を削除する、ドメインサービス化
    const result = await this.repo.delete(id);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
}
