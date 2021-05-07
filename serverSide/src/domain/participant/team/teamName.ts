import { ValueObject } from '../../../shared/domain/ValueObject';

interface TeamNameProps {
  teamName: number;
}

export class TeamName extends ValueObject<TeamNameProps> {
  public get teamName() {
    return this.props.teamName;
  }

  private constructor(props: TeamNameProps) {
    super(props);
  }
  public static create(props: TeamNameProps): TeamName {
    // チームの重複チェックはTeamでやる
    return new TeamName(props);
  }
}
