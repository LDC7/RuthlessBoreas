import RioCharacter from './rioCharacter';

export default class Character {
  public Id: number;
  public Name: string;
  public Race: string;
  public Class: string;
  public Portrait: string;
  public Profile: string;
  public ItemLevel: number;
  public ScoreAll: number;
  public ScoreDps: number;
  public ScoreHealer: number;
  public ScoreTank: number;
  public RaidProgress: string;

  constructor(id: number, rioChar: RioCharacter) {
    this.Id = id;
    this.fromRio(rioChar);
  }

  private fromRio(rioChar: RioCharacter) {        
    this.Name = rioChar.Name;
    this.Race = rioChar.Race;
    this.Class = rioChar.Class;
    this.Portrait = rioChar.Thumbnail_url;
    this.Profile = rioChar.Profile_url;
    this.ItemLevel = rioChar.Gear_item_level_total;
    this.ScoreAll = rioChar.Mythic_plus_score_all;
    this.ScoreDps = rioChar.Mythic_plus_score_dps;
    this.ScoreHealer = rioChar.Mythic_plus_score_healer;
    this.ScoreTank = rioChar.Mythic_plus_score_tank;
    this.RaidProgress = rioChar.Raid_progression_summary;
  }

  public static sortingRaidProgress(f: Character, s: Character): number {
    const fDifficult = f.RaidProgress[f.RaidProgress.length - 1];
    const sDifficult = s.RaidProgress[s.RaidProgress.length - 1];

    if (fDifficult == sDifficult) {
      const fProgress = f.RaidProgress.substr(0, f.RaidProgress.indexOf('/'));
      const sProgress = s.RaidProgress.substr(0, s.RaidProgress.indexOf('/'));

      return parseInt(fProgress) - parseInt(sProgress);
    }

    if ((fDifficult == 'M' && sDifficult == 'H') || (fDifficult == 'H' && sDifficult == 'N'))
      return 1;

    if ((fDifficult == 'H' && sDifficult == 'M') || (fDifficult == 'N' && sDifficult == 'H'))
      return -1;

    return 0;
  }

  public static sortingKeyProgressTank(f: Character, s: Character): number {
    return f.ScoreTank - s.ScoreTank;
  }

  public static sortingKeyProgressHeal(f: Character, s: Character): number {
    return f.ScoreHealer - s.ScoreHealer;
  }

  public static sortingKeyProgressDps(f: Character, s: Character): number {
    return f.ScoreDps - s.ScoreDps;
  }

  public static sortingKeyProgressAll(f: Character, s: Character): number {
    return f.ScoreAll - s.ScoreAll;
  }
}