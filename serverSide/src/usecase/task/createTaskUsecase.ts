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

  public constructor(repository: ITaskRepository) {
    this.repo = repository;
  }

  public async do(props: CreateTaskUsecaseProps): Promise<TaskDTO> {
    const taskFactory = new TaskFactory(this.repo);
    const task = await taskFactory.factory(props);
    const result = await this.repo.create(task);
    return new TaskDTO(result);
  }
}
