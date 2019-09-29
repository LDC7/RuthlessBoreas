import RioCharacter from './rioCharacter';
import WlogsCharacter from './wlogsCharacter';

import Utils from '../utils/utils';

export default class Character {
  public Id: number;
  public Name: string;
  public Race: string;
  public Class: string;
  public Portrait: string;
  public RioProfile: string;
  public ItemLevel: number;
  public ScoreAll: number;
  public ScoreDps: number;
  public ScoreHealer: number | null;
  public ScoreTank: number | null;
  public RaidProgress: string;
  public WlogsProfile: string;
  public AvgDps: number;
  public AvgHps: number;

  public constructor(id: number, rioChar: RioCharacter, wlogsChar: WlogsCharacter) {
    this.Id = id;
    this.fromRio(rioChar);
    this.fromWarcraftLogs(wlogsChar);
  }

  private fromRio(rioChar: RioCharacter) {        
    this.Name = rioChar.Name;
    this.Race = rioChar.Race;
    this.Class = rioChar.Class;
    this.Portrait = rioChar.Thumbnail_url;
    this.RioProfile = rioChar.Profile_url;
    this.ItemLevel = rioChar.Gear_item_level_total;
    this.ScoreAll = rioChar.Mythic_plus_score_all;
    this.ScoreDps = rioChar.Mythic_plus_score_dps;
    this.ScoreHealer = Utils.canHeal(rioChar.Class) ? rioChar.Mythic_plus_score_healer : null;
    this.ScoreTank = Utils.canTank(rioChar.Class) ? rioChar.Mythic_plus_score_tank : null;
    this.RaidProgress = rioChar.Raid_progression_summary;
  }

  private fromWarcraftLogs(wlogsChar: WlogsCharacter) {
    this.WlogsProfile = wlogsChar.Profile;
    this.AvgDps = wlogsChar.AverageDps;
    this.AvgHps = wlogsChar.AverageHps;
  }

  public static comparingName(f: Character, s: Character): number {
    return f.Name == s.Name ? 0 : (f.Name > s.Name ? 1 : -1);
  }

  public static comparingILvl(f: Character, s: Character): number {
    return f.ItemLevel - s.ItemLevel;
  }

  public static comparingRaidProgress(f: Character, s: Character): number {
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

  public static comparingKeyProgressTank(f: Character, s: Character): number {
    if (f.ScoreTank == null && s.ScoreTank == null)
      return 0;

    if (f.ScoreTank == null)
      return -1;

    if (s.ScoreTank == null)
      return 1;

    return f.ScoreTank - s.ScoreTank;
  }

  public static comparingKeyProgressHeal(f: Character, s: Character): number {
    if (f.ScoreHealer == null && s.ScoreHealer == null)
      return 0;

    if (f.ScoreHealer == null)
      return -1;

    if (s.ScoreHealer == null)
      return 1;

    return f.ScoreHealer - s.ScoreHealer;
  }

  public static comparingKeyProgressDps(f: Character, s: Character): number {
    return f.ScoreDps - s.ScoreDps;
  }

  public static comparingKeyProgressAll(f: Character, s: Character): number {
    return f.ScoreAll - s.ScoreAll;
  }
}
