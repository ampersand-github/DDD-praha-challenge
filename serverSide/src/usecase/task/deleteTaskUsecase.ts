import { ITaskRepository } from '../../Interface/repository/ITaskRepository';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

interface DeleteTaskUsecaseProps {
  id: string;
}

export class DeleteTaskUsecase {
  private readonly repo: ITaskRepository;

  public constructor(repository: ITaskRepository) {
    this.repo = repository;
  }

  public async do(props: DeleteTaskUsecaseProps): Promise<number | Error> {
    const id = new UniqueEntityID(props.id);
    // todo ドメインサービス化する 同時にユーザー保有課題を削除する
    const result = await this.repo.delete(id);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
}
