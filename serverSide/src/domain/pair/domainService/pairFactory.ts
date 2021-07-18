import { IPairRepository } from '../repositoryInterface/IPairRepository';
import { Pair } from '../pair';
import { Participant } from '../../participant/participant';
import { PairName } from '../pairName';

interface PairFactoryProps {
  // 人数はpairの許容範囲にしないとpair作成したときにエラーになるので注意
  participants: Participant[];
}

export class PairFactory {
  private readonly pairRepository: IPairRepository;

  public constructor(repository: IPairRepository) {
    this.pairRepository = repository;
  }

  public async do(props: PairFactoryProps): Promise<Pair> {
    const allPair = await this.pairRepository.findAll();

    // 未使用のアルファベット一字を探す
    const usedAlphabetList = allPair.map((pair) => pair.pairName);
    const nonUsedPairName = this.selectNonUsedAlphabet(usedAlphabetList);

    // pairの作成
    const newPairName = PairName.create({ pairName: nonUsedPairName });
    return Pair.create({ pairName: newPairName, participants: props.participants });
  }

  // ["a","b","c"]が引数で与えられたら"d"が返る
  private selectNonUsedAlphabet(usedAlphabetList: string[]): string {
    const alphabet = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    const nonUsedPairNameList = alphabet.filter((one) => usedAlphabetList.indexOf(one) == -1);
    return nonUsedPairNameList[0];
  }
}
