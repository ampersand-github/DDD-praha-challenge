import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../util/prisma/prismaClient';
import { Converter, IConverter } from '../infra/db/repository/shared/converter';
import { TaskRepository } from '../infra/db/repository/taskRepository';
import { ParticipantRepository } from '../infra/db/repository/participantRepository';
import {
  CreateParticipantUsecase,
  FactoryProps,
} from '../usecase/participant/createParticipantUsecase';
import { FindAllParticipantUsecase } from '../usecase/participant/findAllUsecase';
import { DeleteParticipantUsecase } from '../usecase/participant/deleteParticipantUsecase';
import { ParticipantFactory } from '../domain/participant/domainService/participantFactory';
import { DisallowDuplicateMailAddressService } from '../domain/participant/domainService/disallowDuplicateMailaddressService';
import { ToEnrolledStatusUsecase } from '../usecase/participant/toEnrolledStatusUsecase';
import { ToRecessStatusUsecase } from '../usecase/participant/toRecessStatusUsecase';
import { ToWithdrawalStatusUsecase } from '../usecase/participant/toWithdrawalStatusUsecase';
import { PairRepository } from '../infra/db/repository/pairRepository';
import { DistributeOneParticipantForAnotherPairDomainService } from '../domain/pair/domainService/distributeOneParticipantDomainService';
import { RemoveParticipantInPairUsecase } from '../usecase/pair/removeParticipantInPairUsecase';
import { ParticipantDTO } from '../usecase/participant/DTO/participantDTO';
import { PersonalInfoDTO } from '../usecase/participant/DTO/personalInfoDTO';
import { EnrolledStatusEnum } from '../domain/participant/enrolledStatus';

@Controller('participant')
export class ParticipantController {
  private prisma: PrismaClient = prismaClient;
  private converter: IConverter = new Converter();
  //
  private participantRepository = new ParticipantRepository(this.prisma, this.converter);
  private taskRepository = new TaskRepository(this.prisma, this.converter);
  private pairRepository = new PairRepository(this.prisma, this.converter);
  //
  private distributeOneParticipantForAnotherPairDomainService = new DistributeOneParticipantForAnotherPairDomainService(
    this.pairRepository,
  );
  private removeParticipantInPairUsecase = new RemoveParticipantInPairUsecase(
    this.pairRepository,
    this.distributeOneParticipantForAnotherPairDomainService,
  );
  //
  private participantFactory = new ParticipantFactory({
    participantRepository: this.participantRepository,
    taskRepository: this.taskRepository,
  });
  private disallowDuplicateMailAddressService = new DisallowDuplicateMailAddressService(
    this.participantRepository,
  );
  private createParticipantUsecase = new CreateParticipantUsecase(
    this.participantRepository,
    this.participantFactory,
  );
  private findAllParticipantUsecase = new FindAllParticipantUsecase(this.participantRepository);
  private deleteParticipantUsecase = new DeleteParticipantUsecase(this.participantRepository);
  private toEnrolledStatusUsecase = new ToEnrolledStatusUsecase(this.participantRepository);
  private toRecessStatusUsecase = new ToRecessStatusUsecase(
    this.participantRepository,
    this.pairRepository,
    this.removeParticipantInPairUsecase,
  );
  private toWithdrawalStatusUsecase = new ToWithdrawalStatusUsecase(
    this.participantRepository,
    this.pairRepository,
    this.removeParticipantInPairUsecase,
  );

  @Get()
  // todo 返り値をPromise<ParticipantDTO[]>にすれば良かったので余裕があるときに修正する
  public async findAll(): Promise<PersonalInfoDTO[]> {
    return await this.findAllParticipantUsecase.do();
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    return await this.deleteParticipantUsecase.do({ participantId: id });
  }

  @Post()
  public async create(@Body() data: FactoryProps): Promise<ParticipantDTO> {
    return await this.createParticipantUsecase.do(data);
  }

  @Patch('/:id')
  public async update(@Param('id') participantId: string, @Body('status') enrolledStatus: string) {
    if (enrolledStatus === EnrolledStatusEnum.enrolled) {
      return await this.toEnrolledStatusUsecase.do({ participantId: participantId });
    } else if (enrolledStatus === EnrolledStatusEnum.recess) {
      return await this.toRecessStatusUsecase.do({ participantId: participantId });
    } else if (enrolledStatus === EnrolledStatusEnum.withdrawal) {
      return await this.toWithdrawalStatusUsecase.do({ participantId: participantId });
    }
    throw new Error('enrolledStatus名が正しくありません。');
  }
}
