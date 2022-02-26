import { ValueObject } from '@/domain/shared/valueObject';

export interface ITag {
  tag: string;
}


export const TagType = {
  draft: '下書き',
  open: '公開',
  onlyMember: 'メンバーのみ',
} as const;

export type TagType = typeof TagType[keyof typeof TagType];


export class Tag extends ValueObject<ITag> {
  public get tag() {
    return this.props.tag;
  }

  private constructor(props: ITag) {
    super(props);
  }

  public static create(props: ITag): Tag {
    const tagList = Object.values(TagType);
    if (!tagList.find((tag:TagType)=> tag === props.tag)) {
      throw new Error('タグ名が誤っています。');
    }
    return new Tag(props);
  }
}
