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
  
  constructor(data: any) {
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
  }
}