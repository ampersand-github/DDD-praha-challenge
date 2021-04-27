import { ValueObject } from '../../../shared/domain/ValueObject';

interface PairNameProps {
  pairName: string;
}

export class PairName extends ValueObject<PairNameProps> {
  private static reg = /^[a-z]/;

  get value(): string {
    return this.props.pairName;
  }
  private constructor(props: PairNameProps) {
    super(props);
  }
  static create(props: PairNameProps): PairName {
    if (props.pairName.length !== 1) {
      throw new Error('入力された値が1字ではありません。');
    }
    if (!this.reg.test(props.pairName)) {
      throw new Error('入力された値が英小文字1字ではありません。');
    }
    return new PairName(props);
  }
}
