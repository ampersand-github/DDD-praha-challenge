import {
  Pair as PrismaPair,
  Participant as PrismaParticipant,
  ParticipantHavingTask as PrismaParticipantHavingTask,
  PersonalInfo as PrismaPersonalInfo,
  Task as PrismaTask,
} from '@prisma/client';
import { Pair } from '@/domain/pair/pair';
import { UniqueEntityID } from '@/domain/shared/uniqueEntityID';
import { PairName } from '@/domain/pair/pairName';
import { IFromPrismaToParticipant } from '@/infra/db/repository/shared/converter/ToParticipantConverter';
import { IFromPrismaHavingTaskCollectionConverter } from '@/infra/db/repository/shared/converter/ToHavingTaskCollectionConverter';

type PrismaParticipantProps = PrismaParticipant & {
  personalInfo: PrismaPersonalInfo;
  participantHavingTask: PrismaParticipantHavingTask[];
};

type PrismaPairProps = PrismaPair & {
  participants: PrismaParticipantProps[];
};

export interface IFromPrismaToPairConverter {
  do(data: PrismaPairProps, allPrismaTask: PrismaTask[]): Pair;
}

export class ToPairConverter implements IFromPrismaToPairConverter {
  private readonly toHavingTaskCollection: IFromPrismaHavingTaskCollectionConverter;
  private readonly toParticipant: IFromPrismaToParticipant;

  public constructor(
    toHavingTaskCollection: IFromPrismaHavingTaskCollectionConverter,
    toParticipant: IFromPrismaToParticipant,
  ) {
    this.toHavingTaskCollection = toHavingTaskCollection;
    this.toParticipant = toParticipant;
  }

  public do(data: PrismaPairProps, allPrismaTask: PrismaTask[]): Pair {
    const participants = data.participants.map((one) => {
      return this.toParticipant.do(one, allPrismaTask);
    });
    const id = new UniqueEntityID(data.pairId);
    const pairName = PairName.create({ pairName: data.pairName });
    return Pair.create({ pairName: pairName, participants: participants }, id);
  }
}
