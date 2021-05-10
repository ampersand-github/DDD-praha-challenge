import { v4 as uuidv4 } from 'uuid';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string> {
  public constructor(id?: string) {
    super(id ? id : uuidv4());
  }
}
