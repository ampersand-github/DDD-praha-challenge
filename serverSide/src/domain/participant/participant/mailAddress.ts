import { ValueObject } from '../../../shared/domain/ValueObject';

interface MailAddressProps {
  mailAddress: string;
}

export class MailAddress extends ValueObject<MailAddressProps> {
  // todo static と readonlyの違い
  private static reg = /^[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;

  get value(): string {
    return this.props.mailAddress;
  }
  private constructor(props: MailAddressProps) {
    super(props);
  }
  static create(props: MailAddressProps): MailAddress {
    if (!this.reg.test(props.mailAddress)) {
      throw new Error('メールアドレスの書式が間違っています');
    }
    return new MailAddress(props);
  }
}
