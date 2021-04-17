export class PracticeDataDTO {
  public readonly id: number;
  public readonly text: string;
  public constructor(props: { id: number; text: string }) {
    this.id = props.id;
    this.text = props.text;
  }
}
