namespace RuthlessBoreas.Models.Dto
{
  public class DtoRaiderIoGearCorruption
  {
    public int Added { get; set; }
    public int Resisted { get; set; }
    public int Total { get; set; }
    public int CloakRank { get; set; }
    public DtoRaiderIoGearCorruptionSpell[] Spells { get; set; }
  }
}