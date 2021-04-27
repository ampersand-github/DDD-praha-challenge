import { MailAddress } from '../../../domain/participant/participant/mailAddress';

export class ParticipantDTO {
  public readonly name: string;
  public readonly mailAddress: MailAddress;
  public constructor(props: { name: string; mailAddress: string }) {
    this.name = props.name;
    /*
     * todo dtoの中でドメインオブジェクトを呼び出しているけどあっているか？
     *  ユースケース層からドメイン層呼び出しているから問題ないと思う
     * */
    // this.mailAddress = new MailAddress(props.mailAddress);
  }
}
