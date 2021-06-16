import { IPairRepository } from '../repositoryInterface/IPairRepository';
interface DisallowDuplicatePairNameDomainServiceProps {
  pairName: string;
}

export class DisallowDuplicatePairNameDomainService {
  private readonly pairRepository: IPairRepository;

  public constructor(repository: IPairRepository) {
    this.pairRepository = repository;
  }

  public async do(props: DisallowDuplicatePairNameDomainServiceProps): Promise<void> {
    /*
	ペア名が既に存在していたらエラーを発生させる
	*/
    const allPair = await this.pairRepository.findAll();
    for (const pair of allPair) {
      if (pair.pairName === props.pairName) {
        throw new Error('このペア名は既に存在しています。');
      }
    }
  }
}
