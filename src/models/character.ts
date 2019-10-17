import Utils from '../service/utils';

import CharacterIdentity from './characteridentity';
import RioCharacter from './riocharacter';
import Dungeon from './dungeon';

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
  public MaxSeasonKey: Dungeon | null;

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
    this.setMaxSeasonKey(rioChar);
  }

  private setMaxWeekKey(rioChar: RioCharacter) {
    this.MaxWeekKey = null;
    if (rioChar.Mythic_plus_weekly_highest_level_runs_level != null) {
      this.MaxWeekKey = new Dungeon(rioChar.Mythic_plus_weekly_highest_level_runs_name,
        rioChar.Mythic_plus_weekly_highest_level_runs_short_name,
        rioChar.Mythic_plus_weekly_highest_level_runs_score,
        rioChar.Mythic_plus_weekly_highest_level_runs_level,
        rioChar.Mythic_plus_weekly_highest_level_runs_upgrade,
        rioChar.Mythic_plus_weekly_highest_level_runs_time);
    }
  }

  private setMaxSeasonKey(rioChar: RioCharacter) {
    this.MaxSeasonKey = null;
    if (rioChar.Mythic_plus_season_highest_level_runs_level != null) {
      this.MaxSeasonKey = new Dungeon(rioChar.Mythic_plus_season_highest_level_runs_name,
        rioChar.Mythic_plus_season_highest_level_runs_short_name,
        rioChar.Mythic_plus_season_highest_level_runs_score,
        rioChar.Mythic_plus_season_highest_level_runs_level,
        rioChar.Mythic_plus_season_highest_level_runs_upgrade,
        rioChar.Mythic_plus_season_highest_level_runs_time);
    }
  }
}
