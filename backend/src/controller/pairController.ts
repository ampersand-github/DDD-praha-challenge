import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../util/prisma/prismaClient';
import { ParticipantRepository } from '../infra/db/repository/participantRepository';
import { CreatePairUsecase, CreatePairUsecaseProps } from '../usecase/pair/createPairUsecase';
import { FindOnePairUsecase } from '../usecase/pair/findOnePairUsecase';
import { FindAllPairUsecase } from '../usecase/pair/findAllPairUsecase';
import { RemoveParticipantInPairUsecase } from '../usecase/pair/removeParticipantInPairUsecase';
import { AddParticipantInPairUsecase } from '../usecase/pair/addParticipantInPairUsecase';
import { PairFactory } from '../domain/pair/domainService/pairFactory';
import { PairRepository } from '../infra/db/repository/pairRepository';
import { DistributeOneParticipantForAnotherPairDomainService } from '../domain/pair/domainService/distributeOneParticipantDomainService';
import { DisallowDuplicateParticipantInTPairDomainService } from '../domain/pair/domainService/disallowDuplicateParticipantDomainService';
import { DividePairDomainService } from '../domain/pair/domainService/dividePairDomainService';
import { PairDTO } from '../usecase/pair/DTO/pairDTO';
import { ToTaskConverter } from '../infra/db/repository/shared/converter/ToTaskConverter';
import { ToHavingTaskCollectionConverter } from '../infra/db/repository/shared/converter/ToHavingTaskCollectionConverter';
import { ToParticipantConverter } from '../infra/db/repository/shared/converter/ToParticipantConverter';
import { ToPairConverter } from '../infra/db/repository/shared/converter/ToPairConverter';

@Controller('pair')
export class PairController {
  private prisma: PrismaClient = prismaClient;
  //
  private toTaskConverter = new ToTaskConverter();
  private toHavingTaskCollectionConverter = new ToHavingTaskCollectionConverter(
    this.toTaskConverter,
  );
  private toParticipantConverter = new ToParticipantConverter(
    this.toTaskConverter,
    this.toHavingTaskCollectionConverter,
  );
  private toPairConverter = new ToPairConverter(
    this.toHavingTaskCollectionConverter,
    this.toParticipantConverter,
  );
  //
  private participantRepository = new ParticipantRepository(
    this.prisma,
    this.toTaskConverter,
    this.toParticipantConverter,
    this.toHavingTaskCollectionConverter,
  );
  private pairRepository = new PairRepository(this.prisma, this.toPairConverter);
  //
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
    this.participantRepository,
    this.pairRepository,
    new DistributeOneParticipantForAnotherPairDomainService(this.pairRepository),
  );
  private updatePairUsecase = new AddParticipantInPairUsecase(
    this.participantRepository,
    this.pairRepository,
    new DisallowDuplicateParticipantInTPairDomainService(this.pairRepository),
    new DividePairDomainService(this.pairRepository),
  );

  @Get()
  public async findAll(): Promise<PairDTO[]> {
    return await this.findAllPairUsecase.do();
  }

  @Get('/:pairId')
  public async findOne(@Param('pairId') pairId: string): Promise<PairDTO> {
    return await this.findOnePairUsecase.do({ pairId: pairId });
  }

  @Patch('/remove/:id')
  public async delete(@Param('id') pairId: string, @Body('participantId') participantId: string) {
    const data = { pairId: pairId, removeParticipantId: participantId };
    return await this.removeParticipantInPairUsecase.do(data);
  }

  @Post()
  public async create(@Body() data: CreatePairUsecaseProps) {
    return await this.createPairUsecase.do(data);
  }

  @Patch('/add/:id')
  public async update(@Param('id') pairId: string, @Body('participantId') participantId: string) {
    const data = { pairId: pairId, addParticipantId: participantId };
    return await this.updatePairUsecase.do(data);
  }
}
