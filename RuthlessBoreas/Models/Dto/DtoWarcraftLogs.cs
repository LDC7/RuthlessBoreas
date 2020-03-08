namespace RuthlessBoreas.Models.Dto
{
  public class DtoWarcraftLogs
  {
    public int EncounterID { get; set; }
    public string EncounterName { get; set; }
    public string Class { get; set; }
    public string Spec { get; set; }
    public int Rank { get; set; }
    public int OutOf { get; set; }
    public int Duration { get; set; }
    public long StartTime { get; set; }
    public string ReportID { get; set; }
    public int FightID { get; set; }
    public int Difficulty { get; set; }
    public int CharacterID { get; set; }
    public string CharacterName { get; set; }
    public string Server { get; set; }
    public double Percentile { get; set; }
    public int IlvlKeyOrPatch { get; set; }
    public DtoWarcraftLogsTalant[] Talents { get; set; }
    public DtoWarcraftLogsItem[] Gear { get; set; }
    public double Total { get; set; }
    public bool Estimated { get; set; }
  }
}
