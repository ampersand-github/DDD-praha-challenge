import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskDTO } from '../usecase/task/DTO/taskDTO';
import { UpdateTaskUsecaseProps } from '../usecase/task/updateTaskUsecase';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../util/prisma/prismaClient';
import { Converter, IConverter } from '../infra/db/repository/shared/converter';
import { TaskRepository } from '../infra/db/repository/taskRepository';
import { ParticipantRepository } from '../infra/db/repository/participantRepository';
import { TaskFactory } from '../domain/task/taskFactory';
import { CreatePairUsecase } from '../usecase/pair/createPairUsecase';
import { FindOnePairUsecase } from '../usecase/pair/findOnePairUsecase';
import { FindAllPairUsecase } from '../usecase/pair/findAllPairUsecase';
import { RemoveParticipantInPairUsecase } from '../usecase/pair/removeParticipantInPairUsecase';
import { AddParticipantInPairUsecase } from '../usecase/pair/addParticipantInPairUsecase';
import { PairFactory } from '../domain/pair/domainService/pairFactory';
import { PairRepository } from '../infra/db/repository/pairRepository';
import { DistributeOneParticipantForAnotherPairDomainService } from '../domain/pair/domainService/distributeOneParticipantDomainService';
import { DisallowDuplicateParticipantInTPairDomainService } from '../domain/pair/domainService/disallowDuplicateParticipantDomainService';
import { DividePairDomainService } from '../domain/pair/domainService/dividePairDomainService';

@Controller('pair')
export class PairController {
  private prisma: PrismaClient = prismaClient;
  private converter: IConverter = new Converter();
  //
  private taskRepository = new TaskRepository(this.prisma, this.converter);
  private participantRepository = new ParticipantRepository(this.prisma, this.converter);
  private pairRepository = new PairRepository(this.prisma, this.converter);
  //
  private taskFactory = new TaskFactory(this.taskRepository);
  private pairFactory = new PairFactory(this.pairRepository);
  //
  private createPairUsecase = new CreatePairUsecase(
    this.participantRepository,
    this.pairRepository,
    this.pairFactory,
  );
  private findAllPairUsecase = new FindAllPairUsecase(this.pairRepository);
  private findOnePairUsecase = new FindOnePairUsecase(this.pairRepository);
  private removeParticipantInPairUsecase = new RemoveParticipantInPairUsecase(
    this.pairRepository,
    new DistributeOneParticipantForAnotherPairDomainService(this.pairRepository),
  );
  private updatePairUsecase = new AddParticipantInPairUsecase(
    this.pairRepository,
    new DisallowDuplicateParticipantInTPairDomainService(this.pairRepository),
    new DividePairDomainService(this.pairRepository),
  );

  /*
  @Get()
  public async findAll(): Promise<TaskDTO[]> {
    return await this.findAllTaskUsecase.do();
  }
 */
  /*

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<TaskDTO> {
    return await this.findOneTaskUsecase.do({ id: id });
  }
 */
  /*
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    return await this.deleteTaskUsecase.do({ id: id });
  }
 */

  /*
  @Post()
  public async create(@Body() data: ITask) {
    return await this.createTaskUsecase.do(data);
  }
 */

  /*
  @Patch('/:id')
  public async update(
    @Param('id') taskId: string,
    @Body('updateName') updateName: string,
    @Body('updateDescription') updateDescription: string,
    @Body('updateGroup') updateGroup: string,
  ) {
    const data: UpdateTaskUsecaseProps = {
      taskId: taskId,
      updateName: updateName,
      updateDescription: updateDescription,
      updateGroup: updateGroup,
    };
    return await this.updateTaskUsecase.do(data);
  }
 */
}
