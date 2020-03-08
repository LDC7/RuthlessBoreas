namespace RuthlessBoreas.Models
{
  using RuthlessBoreas.Models.Dto;
  using System.Collections.Generic;
  using System.Linq;

  public class WarcraftLogsCharacter
  {
    public int AverageDps { get; private set; }
    public int AverageHps { get; private set; }
    public int DpsPercent { get; private set; }
    public int HpsPercent { get; private set; }
    public string ServerName { get; private set; }

    public WarcraftLogsCharacter(DtoWarcraftLogs[] dpsDto, DtoWarcraftLogs[] hpsDto)
    {
      if (dpsDto != null && dpsDto.Length > 0)
      {
        var bestDpsPerEncounter = GetBestPerEncounter(dpsDto);
        this.AverageDps = (int)bestDpsPerEncounter.Average(fight => fight.Total);
        this.DpsPercent = (int)bestDpsPerEncounter.Average(fight => fight.Percentile);

        this.ServerName = dpsDto.First().Server;
      }

      if (hpsDto != null && hpsDto.Length > 0)
      {
        var bestHpsPerEncounter = GetBestPerEncounter(hpsDto);
        this.AverageHps = (int)bestHpsPerEncounter.Average(fight => fight.Total);
        this.HpsPercent = (int)bestHpsPerEncounter.Average(fight => fight.Percentile);

        this.ServerName = hpsDto.First().Server;
      }
    }

    public static IEnumerable<DtoWarcraftLogs> GetBestPerEncounter(DtoWarcraftLogs[] data)
    {
      return data
        .GroupBy(fight => fight.EncounterName)
        .Select(group => GetBestForEncounter(group));
    }

    private static DtoWarcraftLogs GetBestForEncounter(IEnumerable<DtoWarcraftLogs> encounterFights)
    {
      var sortedByDifficultFights = encounterFights.OrderByDescending(fight => fight.Difficulty);
      var highestDifficultFights = sortedByDifficultFights.Where(fight => fight.Difficulty == sortedByDifficultFights.First().Difficulty);
      return highestDifficultFights.OrderByDescending(fight => fight.Total).First();
    }
  }
}