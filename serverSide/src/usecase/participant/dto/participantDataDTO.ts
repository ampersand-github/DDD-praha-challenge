import { MailAddress } from '../../../domain/participant/participant/mailAddress';

export class ParticipantDTO {
  public readonly name: string;
  public readonly mailAddress: MailAddress;
  public constructor(props: { name: string; mailAddress: string }) {
    this.name = props.name;
    // this.mailAddress = new MailAddress(props.mailAddress);
  }
}
