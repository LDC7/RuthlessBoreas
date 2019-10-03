import CharacterIdentity from './characteridentity';
import RioCharacter from './riocharacter';
import Dungeon from './dungeon';

import Utils from '../utils/utils';

export default class Character {
  public Id: number;
  public Name: string;
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
  public MainId: number;
  public MainName: string | null;
  public MaxWeekKey: Dungeon | null;
  public ArmoryProfile: string;

  public constructor(identity: CharacterIdentity, rioChar: RioCharacter, wlogsProfile: string, armoryProfile: string) {
    this.Id = identity.Id;
    this.MainId = identity.Main;
    this.fromRio(rioChar);
    this.WlogsProfile = wlogsProfile;
    this.ArmoryProfile = armoryProfile;
  }

  public setMainName(characters: Array<Character>) {
    if (this.Id != this.MainId) {
      const mainChar = characters.filter(char => char.Id == this.MainId)[0];
      this.MainName = mainChar.Name;
    }
  }

  private fromRio(rioChar: RioCharacter) {        
    this.Name = rioChar.Name;
    this.Class = rioChar.Class;
    this.Portrait = rioChar.Thumbnail_url;
    this.RioProfile = rioChar.Profile_url;
    this.ItemLevel = rioChar.Gear_item_level_total;
    this.ScoreAll = Math.round(rioChar.Mythic_plus_score_all);
    this.ScoreDps = Math.round(rioChar.Mythic_plus_score_dps);
    this.ScoreHealer = Utils.canHeal(rioChar.Class) ? Math.round(rioChar.Mythic_plus_score_healer) : null;
    this.ScoreTank = Utils.canTank(rioChar.Class) ? Math.round(rioChar.Mythic_plus_score_tank) : null;
    this.RaidProgress = rioChar.Raid_progression_summary;
    this.setMaxWeekKey(rioChar);
  }

  private setMaxWeekKey(rioChar: RioCharacter) {
    this.MaxWeekKey = null;
    if (rioChar.Mythic_plus_weekly_highest_level_runs_level != null) {
      this.MaxWeekKey = new Dungeon(rioChar.Mythic_plus_weekly_highest_level_runs_name,
        rioChar.Mythic_plus_weekly_highest_level_runs_short_name,
        rioChar.Mythic_plus_weekly_highest_level_runs_score,
        rioChar.Mythic_plus_weekly_highest_level_runs_level);
    }
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

  public static comparingMaxWeekKey(f: Character, s: Character): number {
    if (f.MaxWeekKey == null && s.MaxWeekKey == null)
      return 0;

    if (f.MaxWeekKey == null)
      return -1;

    if (s.MaxWeekKey == null)
      return 1;

    if (f.MaxWeekKey.KeyLevel == s.MaxWeekKey.KeyLevel)
      return f.MaxWeekKey.Score - s.MaxWeekKey.Score;

    return f.MaxWeekKey.KeyLevel - s.MaxWeekKey.KeyLevel;
  }

  public static comparingMainAlt(f: Character, s: Character): number {
    if ((f.MainId == f.Id && s.MainId == s.Id) || (f.MainId != f.Id && s.MainId != s.Id))
      return 0;
    
    if (f.MainId == f.Id)
      return 1;

    return -1;
  }
}
