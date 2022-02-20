import { Task } from '../../domain/task/task';
import { TaskDTO } from './DTO/taskDTO';
import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';

export class FindAllTaskUsecase {
  private readonly repo: ITaskRepository;

  public constructor(repository: ITaskRepository) {
    this.repo = repository;
  }

  public async do(): Promise<TaskDTO[]> {
    const taskList = await this.repo.findAll();

    return taskList.map((one: Task) => {
      return new TaskDTO(one);
    });
  }
}
