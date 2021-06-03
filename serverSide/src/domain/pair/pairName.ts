import { ValueObject } from '../shared/ValueObject';

interface PairNameProps {
  pairName: string;
}

export class PairName extends ValueObject<PairNameProps> {
  private static reg = /^[a-z]/;

  public get pairName() {
    return this.props.pairName;
  }

  private constructor(props: PairNameProps) {
    super(props);
  }
  public static create(props: PairNameProps): PairName {
    if (props.pairName.length !== 1) {
      throw new Error('入力された値が1字ではありません。');
    }
    if (!this.reg.test(props.pairName)) {
      throw new Error('入力された値が英小文字ではありません。');
    }
    return new PairName(props);
  }
}
