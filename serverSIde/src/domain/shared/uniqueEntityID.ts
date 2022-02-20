import { v4 as uuidv4 } from 'uuid';
import { Identifier } from '@/domain/shared/identifier';

export class UniqueEntityID extends Identifier<string> {
  public constructor(id?: string) {
    const pattern = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/;
    if (!pattern.test(id) && id !== undefined) {
      throw new Error(`${id}はuuidの型として正しくありません。`);
    }
    super(id ? id : uuidv4());
  }
}
