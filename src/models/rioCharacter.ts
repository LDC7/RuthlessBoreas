import CharacterIdentity from './characteridentity';

const raidName = require('../data/raidData.json').lastRaid;

export default class RioCharacter {
  public Name: string;
  public Race: string;
  public Class: string;
  public Active_spec_name: string;
  public Active_spec_role: string;
  public Gender: string;
  public Faction: string;
  public Achievement_points: number;
  public Honorable_kills: number;
  public Thumbnail_url: string;
  public Region: string;
  public Realm: string;
  public Profile_url: string;
  public Profile_banner: string;
  public Gear_item_level_total: number;
  public Mythic_plus_score_all: number;
  public Mythic_plus_score_dps: number;
  public Mythic_plus_score_healer: number;
  public Mythic_plus_score_tank: number;
  public Raid_progression_summary: string;
  public Mythic_plus_weekly_highest_level_runs_level: number;
  public Mythic_plus_weekly_highest_level_runs_score: number;
  public Mythic_plus_weekly_highest_level_runs_name: string;
  public Mythic_plus_weekly_highest_level_runs_short_name: string;
  public Mythic_plus_weekly_highest_level_runs_upgrade: number;
  public Mythic_plus_season_highest_level_runs_level: number;
  public Mythic_plus_season_highest_level_runs_score: number;
  public Mythic_plus_season_highest_level_runs_name: string;
  public Mythic_plus_season_highest_level_runs_short_name: string;
  public Mythic_plus_season_highest_level_runs_upgrade: number;
  
  public constructor(data: any) {
    this.Name = data.name;
    this.Class = data.class;
    this.Thumbnail_url = data.thumbnail_url;
    this.Profile_url = data.profile_url;
    this.Gear_item_level_total = data.gear.item_level_total;
    const score = data.mythic_plus_scores_by_season[0].scores;
    this.Mythic_plus_score_all = score.all;
    this.Mythic_plus_score_dps = score.dps;
    this.Mythic_plus_score_healer = score.healer;
    this.Mythic_plus_score_tank = score.tank;
    this.Raid_progression_summary = data.raid_progression[raidName].summary;
    const week_keys: Array<any> = data.mythic_plus_weekly_highest_level_runs;
    if (week_keys.length > 0) {
      this.Mythic_plus_weekly_highest_level_runs_level = week_keys[0].mythic_level;
      this.Mythic_plus_weekly_highest_level_runs_score = week_keys[0].score;
      this.Mythic_plus_weekly_highest_level_runs_name = week_keys[0].dungeon;
      this.Mythic_plus_weekly_highest_level_runs_short_name = week_keys[0].short_name;
      this.Mythic_plus_weekly_highest_level_runs_upgrade = week_keys[0].num_keystone_upgrades;
    }
    const season_keys: Array<any> = data.mythic_plus_highest_level_runs;
    if (season_keys.length > 0) {
      this.Mythic_plus_season_highest_level_runs_level = season_keys[0].mythic_level;
      this.Mythic_plus_season_highest_level_runs_score = season_keys[0].score;
      this.Mythic_plus_season_highest_level_runs_name = season_keys[0].dungeon;
      this.Mythic_plus_season_highest_level_runs_short_name = season_keys[0].short_name;
      this.Mythic_plus_season_highest_level_runs_upgrade = season_keys[0].num_keystone_upgrades;
    }
  }

  public static getCharRaiderIoUrl(char: CharacterIdentity): string {
    const name = encodeURIComponent(char.Name);
    const fields = 'gear%2Craid_progression%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_weekly_highest_level_runs%2Cmythic_plus_highest_level_runs';
    return `https://raider.io/api/v1/characters/profile?region=${char.Region}&realm=${char.Realm}&name=${name}&fields=${fields}`;
  }
}
