import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';
import { TaskDTO } from './DTO/taskDTO';
import { TaskFactory } from '../../domain/task/taskFactory';

interface CreateTaskUsecaseProps {
  name: string;
  description: string;
  group: string;
}

export class CreateTaskUsecase {
  private readonly repo: ITaskRepository;
  private readonly factory;

  public constructor(repository: ITaskRepository, factory: TaskFactory) {
    this.repo = repository;
    this.factory = factory;
  }

  public async do(props: CreateTaskUsecaseProps): Promise<TaskDTO> {
    const task = await this.factory.factory(props);
    const result = await this.repo.create(task);
    return new TaskDTO(result);
  }
}
