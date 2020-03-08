namespace RuthlessBoreas.Models
{
  using RuthlessBoreas.Models.Dto;
  using RuthlessBoreas.Services;
  using System.Linq;

  public class RioCharacter
  {
    public string Class { get; }
    public string Portrait { get; }
    public string RioProfile { get; }
    public int ItemLevel { get; }
    public int ScoreAll { get; }
    public int ScoreDps { get; }
    public int? ScoreHealer { get; }
    public int? ScoreTank { get; }
    public string RaidProgress { get; }
    public string MainName { get; }
    public Dungeon MaxWeekKey { get; }
    public Dungeon MaxSeasonKey { get; }

    public RioCharacter(DtoRaiderIo dto)
    {
      this.Class = dto.Class;
      this.Portrait = dto.Thumbnail_url;
      this.RioProfile = dto.Profile_url;
      this.ItemLevel = dto.Gear.Item_level_total > 0 ? dto.Gear.Item_level_total : dto.Gear.Item_level_equipped;
      var score = dto.Mythic_plus_scores_by_season[0].Scores;
      this.ScoreAll = (int)score.All;
      this.ScoreDps = (int)score.Dps;
      this.ScoreHealer = Utils.CanHeal(this.Class) ? (int?)score.Healer : null;
      this.ScoreTank = Utils.CanTank(this.Class) ? (int?)score.Tank : null;
      this.RaidProgress = dto.Raid_progression[StorageService.LAST_RAID].Summary;

      if (dto.Mythic_plus_weekly_highest_level_runs.Length > 0)
      {
        var bestWeekKey = dto.Mythic_plus_weekly_highest_level_runs.OrderByDescending(run => run.Score).First();
        this.MaxWeekKey = new Dungeon(bestWeekKey.Dungeon, bestWeekKey.Short_name, (int)bestWeekKey.Score,
          bestWeekKey.Mythic_level, bestWeekKey.Num_keystone_upgrades, bestWeekKey.Clear_time_ms);
      }

      if (dto.Mythic_plus_highest_level_runs.Length > 0)
      {
        var bestSeasonKey = dto.Mythic_plus_highest_level_runs.OrderByDescending(run => run.Score).First();
        this.MaxSeasonKey = new Dungeon(bestSeasonKey.Dungeon, bestSeasonKey.Short_name, (int)bestSeasonKey.Score,
          bestSeasonKey.Mythic_level, bestSeasonKey.Num_keystone_upgrades, bestSeasonKey.Clear_time_ms);
      }
    }
  }
}
