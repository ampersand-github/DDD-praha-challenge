import { PairName } from '../domain/pair/pairName';
import {
  dummyParticipant1,
  dummyParticipant2,
  dummyParticipant3,
  dummyParticipant4,
  dummyParticipant5,
  dummyParticipant6,
  dummyParticipant7,
} from './dummyPerticipant';
import { UniqueEntityID } from '../domain/shared/UniqueEntityID';
import { Pair } from '../domain/pair/pair';

export const DummyPairUpperLimit = 3;
export const DummyPairLowerLimit = 2;
const DummyPairA = PairName.create({ pairName: 'a' });
const DummyPairB = PairName.create({ pairName: 'b' });
const DummyPairC = PairName.create({ pairName: 'c' });

const dummyPairDataBase = {
  pairName: DummyPairA,
  participants: [],
  upperLimit: DummyPairUpperLimit,
  lowerLimit: DummyPairLowerLimit,
};

export const dummyPairData1 = {
  ...dummyPairDataBase,
  pairName: DummyPairA,
  participants: [dummyParticipant1, dummyParticipant2],
};

const dummyPairData2 = {
  ...dummyPairDataBase,
  pairName: DummyPairB,
  participants: [dummyParticipant3, dummyParticipant4],
};

const dummyPairData3 = {
  ...dummyPairDataBase,
  pairName: DummyPairC,
  participants: [dummyParticipant5, dummyParticipant6, dummyParticipant7],
};

export const dummyPairId = new UniqueEntityID(
  '99999999-9999-pair-4444-99999999999s',
);
export const dummyPair1 = Pair.create(dummyPairData1, dummyPairId);
export const dummyPair2 = Pair.create(dummyPairData2, dummyPairId);
export const dummyPair3 = Pair.create(dummyPairData3); // idはランダムで割り振られる
