import { UniqueEntityID } from '../../domain/shared/UniqueEntityID';
import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';
import { TaskDTO } from './DTO/taskDTO';

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
