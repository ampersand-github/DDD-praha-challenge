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
    const result = await this.repo.findOne(props.id);
    return new TaskDTO(result);
  }
}
