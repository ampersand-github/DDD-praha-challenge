interface CollectionProps {
  [index: string]: any;
}

// todo [低] ここ必要に応じて作り込む 2つめのコレクションができたら共通部分をこっち持ってくるなど

export abstract class Collection<T extends CollectionProps> {
  protected props: T;

  protected constructor(props: T) {
    this.props = props;
  }
}
