import { v4 as uuidv4 } from 'uuid';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string> {
  public constructor(id?: string) {
    const pattern = /[0-9]{8}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{12}/;
    if (!pattern.test(id)) {
      throw new Error(`${id}はuuidの型として正しくありません。`);
    }
    super(id ? id : uuidv4());
  }
}
