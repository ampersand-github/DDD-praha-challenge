export class PracticeData {
  private readonly id: number;
  private readonly text: string;

  public constructor(props: { id: number; text: string }) {
    const { id, text } = props;
    this.id = id;
    this.text = text;
  }
}
