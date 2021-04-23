import { IInsertRepository } from './repository/IInsertRepository';
import { Practice } from '@prisma/client';
import { PracticeData } from '../../domain/practice/practice';

export class insertUseCase {
  private readonly repo: IInsertRepository;

  public constructor(repository: IInsertRepository) {
    this.repo = repository;
  }

  public async do(text: string): Promise<Practice> {
    // ここでドメインに引数を突っ込むことでドメインルールのチェックをしている
    const result = new PracticeData({ text: text });
    // ユースケース層でチェックしたのち↑、リポジトリで登録
    return this.repo.insert(result.getAllProperties().text);
  }
}
