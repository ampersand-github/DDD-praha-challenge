import { ITaskRepository } from '../../Interface/repository/ITaskRepository';
import { TaskDTO } from '../../dto/usecase/task/taskDTO';
import { Task } from '../../domain/task/task';

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
