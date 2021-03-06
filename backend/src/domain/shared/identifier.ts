export class Identifier<T> {
  public constructor(private readonly value: T) {
    this.value = value;
  }

  public equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    return id.toValue() === this.value;
  }

  public toString() {
    return String(this.value);
  }

  /**
   * Return raw value of identifier
   */

  public toValue(): T {
    return this.value;
  }
}
