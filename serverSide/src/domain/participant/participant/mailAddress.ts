import { ValueObject } from '../../../shared/domain/ValueObject';

interface MailAddressProps {
  mailAddress: string;
}

export class MailAddress extends ValueObject<MailAddressProps> {
  // メールアドレスチェックはこれでは不十分であるが、今回は練習なので良しとする
  private static reg = /^[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;

  private constructor(props: MailAddressProps) {
    super(props);
  }
  static create(props: MailAddressProps): MailAddress {
    if (!this.reg.test(props.mailAddress)) {
      throw new Error(
        `メールアドレスの書式が間違っています。${props.mailAddress}`,
      );
    }
    return new MailAddress(props);
  }
}
