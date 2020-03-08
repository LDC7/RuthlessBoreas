namespace RuthlessBoreas.Models.Dto
{
  using System.Collections.Generic;

  public class DtoRaiderIoGear
  {
    public int Item_level_equipped { get; set; }
    public int Item_level_total { get; set; }
    public decimal Artifact_traits { get; set; }
    public DtoRaiderIoGearCorruption Corruption { get; set; }
    public IDictionary<string, DtoRaiderIoGearItem> Items { get; set; }
  }
}