import { ValueObject } from '../../../shared/domain/ValueObject';
import {EnrolledStatusType} from "./enrolledStatus";

interface MailAddressProps {
  mailAddress: string;
}

export class MailAddress extends ValueObject<MailAddressProps> {
  private static reg = /^[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;

  public get mailAddress(): MailAddressProps["mailAddress"] {
    return this.props.mailAddress;
  }

  private constructor(props: MailAddressProps) {
    super(props);
  }
  public static create(props: MailAddressProps): MailAddress {
    if (!this.reg.test(props.mailAddress)) {
      throw new Error('メールアドレスの書式が間違っています');
    }
    return new MailAddress(props);
  }
}
