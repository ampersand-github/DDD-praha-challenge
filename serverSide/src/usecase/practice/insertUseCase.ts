import { Practice } from '@prisma/client';
import { PracticeData } from '../../domain/practice/practice';
import { IPracticeRepository } from './repositoryInterface/IPracticeRepository';

export class insertUseCase {
  private readonly repo: IPracticeRepository;

  public constructor(repository: IPracticeRepository) {
    this.repo = repository;
  }

  public async do(text: string): Promise<Practice> {
    // ここでドメインに引数を突っ込むことでドメインルールのチェックをしている
    const result = new PracticeData({ text: text });
    // ユースケース層でチェックしたのち↑、リポジトリで登録
    return this.repo.insert(result.getAllProperties().text);
  }
}
