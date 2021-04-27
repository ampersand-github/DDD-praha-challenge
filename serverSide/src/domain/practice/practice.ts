export class PracticeData {
  private readonly id: number;
  private readonly text: string;
  public constructor(props: { id?: number; text: string }) {
    const { id, text } = props;

    // ドメインのルール
    if (text.length >= 10) {
      throw new Error('タイトルは10字未満にしてください。');
    }
    this.id = id;
    this.text = text;
  }

  public getAllProperties() {
    return {
      id: this.id,
      text: this.text,
    };
  }
}
