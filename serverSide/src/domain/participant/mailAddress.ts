import { ValueObject } from '../shared/ValueObject';

interface MailAddressProps {
  mailAddress: string;
}

export class MailAddress extends ValueObject<MailAddressProps> {
  // メールアドレスチェックはこれでは不十分であるが、今回は練習なので良しとする
  private static reg = /^[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;

  public get mailAddress() {
    return this.props.mailAddress;
  }

  private constructor(props: MailAddressProps) {
    super(props);
  }
  public static create(props: MailAddressProps): MailAddress {
    if (!this.reg.test(props.mailAddress)) {
      throw new Error(
        `${props.mailAddress}のメールアドレスの書式が間違っています。`,
      );
    }
    return new MailAddress(props);
  }
}
