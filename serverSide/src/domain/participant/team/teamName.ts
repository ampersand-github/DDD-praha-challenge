import { ValueObject } from '../../../shared/domain/ValueObject';

interface TeamNameProps {
  teamName: number;
}

export class TeamName extends ValueObject<TeamNameProps> {
  private constructor(props: TeamNameProps) {
    super(props);
  }
  public static create(props: TeamNameProps): TeamName {
    // チームの重複チェックはTeamでやる
    return new TeamName(props);
  }
}
