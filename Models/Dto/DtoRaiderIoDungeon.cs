namespace RuthlessBoreas.Models.Dto
{
  public class DtoRaiderIoDungeon
  {
    public string Dungeon { get; set; }
    public string Short_name { get; set; }
    public int Mythic_level { get; set; }
    public string Completed_at { get; set; }
    public int Clear_time_ms { get; set; }
    public int Num_keystone_upgrades { get; set; }
    public int Map_challenge_mode_id { get; set; }
    public double Score { get; set; }
    public DtoRaiderIoDungeonAffix[] Affixes { get; set; }
    public string Url { get; set; }
  }
}