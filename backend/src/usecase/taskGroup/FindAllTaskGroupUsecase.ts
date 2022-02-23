import { TaskGroup } from '../../domain/taskGroup/taskGroup';
import { TaskGroupDTO } from './DTO/taskGroupDTO';
import { ITaskGroupRepository } from '../../domain/taskGroup/repositoryInterface/ITaskGroupRepository';

export class FindAllTaskGroupUsecase {
  private readonly repo: ITaskGroupRepository;

  public constructor(repository: ITaskGroupRepository) {
    this.repo = repository;
  }

  public async do(): Promise<TaskGroupDTO[]> {
    const taskGroupList = await this.repo.findAll();
    return taskGroupList.map((one: TaskGroup) => {
      return new TaskGroupDTO(one);
    });
  }
}
