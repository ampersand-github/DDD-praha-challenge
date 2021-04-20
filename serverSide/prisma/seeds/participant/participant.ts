import { v4 as uuid } from 'uuid';
import * as faker from 'faker';

export const participantDataSource = (pairData) => [
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[0].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[0].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[0].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[1].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[1].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[2].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[2].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[3].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[3].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[3].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[4].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[4].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[5].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[5].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[6].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[6].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[6].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[7].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
    pairId: pairData[7].pairId,
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
  },
  {
    participantId: uuid(),
    name: faker.name.lastName() + ' ' + faker.name.firstName(),
    mailAddress: faker.internet.email(),
  },
];
