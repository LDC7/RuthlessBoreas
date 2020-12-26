namespace RuthlessBoreas.Models.Dto
{
  using System.Collections.Generic;

  public class DtoRaiderIo
  {
    public string Name { get; set; }
    public string Race { get; set; }
    public string Class { get; set; }
    public string Active_spec_name { get; set; }
    public string Active_spec_role { get; set; }
    public string Gender { get; set; }
    public string Faction { get; set; }
    public int Achievement_points { get; set; }
    public int Honorable_kills { get; set; }
    public string Thumbnail_url { get; set; }
    public string Region { get; set; }
    public string Realm { get; set; }
    public string Profile_url { get; set; }
    public string Profile_banner { get; set; }
    public DtoRaiderIoGuild Guild { get; set; }
    public DtoRaiderIoSeason[] Mythic_plus_scores_by_season { get; set; }
    public DtoRaiderIoDungeon[] Mythic_plus_highest_level_runs { get; set; }
    public DtoRaiderIoDungeon[] Mythic_plus_weekly_highest_level_runs { get; set; }
    public DtoRaiderIoGear Gear { get; set; }
    public IDictionary<string, DtoRaiderIoRaid> Raid_progression { get; set; }
  }
}
