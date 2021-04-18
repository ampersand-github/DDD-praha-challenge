import { v4 as uuid } from 'uuid';
import * as faker from 'faker';

export const participantDataSource = [
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
    {
        participantId: uuid(),
        name: faker.name.lastName() + " " + faker.name.firstName(),
        mailAddress: faker.internet.email(),
    },
]
