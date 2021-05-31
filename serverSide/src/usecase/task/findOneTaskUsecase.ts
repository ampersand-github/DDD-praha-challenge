import { ITaskRepository } from '../../Interface/repository/ITaskRepository';
import { TaskDTO } from '../../dto/usecase/task/taskDTO';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

interface findOneTaskUsecaseProps {
  id: string;
}

export class FindOneTaskUsecase {
  private readonly repo: ITaskRepository;

  public constructor(repository: ITaskRepository) {
    this.repo = repository;
  }

  public async do(props: findOneTaskUsecaseProps): Promise<TaskDTO> {
    const id = new UniqueEntityID(props.id);
    const result = await this.repo.findOne(id);
    if (result instanceof Error) {
      throw result;
    }
    return new TaskDTO(result);
  }
}
