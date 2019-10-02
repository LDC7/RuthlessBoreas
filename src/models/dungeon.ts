import RioCharacter from './riocharacter';

export default class Dungeon {
  public MaxWeekKeyLevel: number;
  public MaxWeekKeyShortName: string | null;
  public MaxWeekKeyName: string | null;
  public Score: number;

  public constructor(rioChar: RioCharacter) {
    if (rioChar.Mythic_plus_weekly_highest_level_runs_level != null) {
      this.MaxWeekKeyLevel = rioChar.Mythic_plus_weekly_highest_level_runs_level;
      this.MaxWeekKeyName = rioChar.Mythic_plus_weekly_highest_level_runs_name;
      this.MaxWeekKeyShortName = rioChar.Mythic_plus_weekly_highest_level_runs_short_name;
      this.Score = rioChar.Mythic_plus_weekly_highest_level_runs_score;
    } else {
      this.MaxWeekKeyLevel = 0;
      this.MaxWeekKeyName = null;
      this.Score = 0;
    }
  }

  public getKeyString(): string | null {
    if (this.MaxWeekKeyLevel != null)
      return `${this.MaxWeekKeyLevel} ${this.MaxWeekKeyShortName}`;

    return null;
  }
}