interface CollectionProps {
  [index: string]: any;
}

// todo ここ必要に応じて作り込む

export abstract class Collection<T extends CollectionProps> {
  protected props: T;

  protected constructor(props: T) {
    this.props = props;
  }
}
