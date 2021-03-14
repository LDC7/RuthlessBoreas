namespace RuthlessBoreas.Models
{
  using System.Collections.Generic;
  using System.Linq;
  using RuthlessBoreas.Models.Dto;

  public class WarcraftLogsCharacter
  {
    public int AverageDps { get; private set; }
    public int AverageHps { get; private set; }
    public int DpsPercent { get; private set; }
    public int HpsPercent { get; private set; }
    public string ServerName { get; private set; }

    public IDictionary<string, (int? Dps, int? DpsPercent, int? Hps, int? HpsPercent)> BestDpsHpsPerEncounter { get; }
      = new Dictionary<string, (int? Dps, int? DpsPercent, int? Hps, int? HpsPercent)>();

    public WarcraftLogsCharacter(DtoWarcraftLogs[] dpsDto, DtoWarcraftLogs[] hpsDto)
    {
      if (dpsDto != null && dpsDto.Length > 0 && hpsDto != null && hpsDto.Length > 0)
      {
        var bestDpsPerEncounter = GetBestPerEncounter(dpsDto).OrderBy(fight => fight.EncounterID);
        this.AverageDps = (int)bestDpsPerEncounter.Average(fight => fight.Total);
        this.DpsPercent = (int)bestDpsPerEncounter.Average(fight => fight.Percentile);

        var bestHpsPerEncounter = GetBestPerEncounter(hpsDto).OrderBy(fight => fight.EncounterID);
        this.AverageHps = (int)bestHpsPerEncounter.Average(fight => fight.Total);
        this.HpsPercent = (int)bestHpsPerEncounter.Average(fight => fight.Percentile);

        if (bestHpsPerEncounter.Count() <= bestDpsPerEncounter.Count())
        {
          foreach (var encounter in bestDpsPerEncounter)
          {
            var encounterHps = bestHpsPerEncounter.FirstOrDefault(e => e.EncounterName == encounter.EncounterName);
            this.BestDpsHpsPerEncounter.Add(encounter.EncounterName,
              ((int)encounter.Total, (int)encounter.Percentile, (int?)encounterHps?.Total, (int?)encounterHps.Percentile));
          }
        }
        else
        {
          foreach (var encounter in bestHpsPerEncounter)
          {
            var encounterDps = bestDpsPerEncounter.FirstOrDefault(e => e.EncounterName == encounter.EncounterName);
            this.BestDpsHpsPerEncounter.Add(encounter.EncounterName,
              ((int?)encounterDps?.Total, (int?)encounterDps.Percentile, (int)encounter.Total, (int)encounter.Percentile));
          }
        }

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