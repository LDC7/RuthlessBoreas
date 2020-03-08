namespace RuthlessBoreas.Models.Dto
{
  public class DtoRaiderIoGearItem
  {
    public int Item_id { get; set; }
    public int Item_level { get; set; }
    public int Item_quality { get; set; }
    public bool Is_legion_legendary { get; set; }
    public bool Is_azerite_armor { get; set; }
    public DtoRaiderIoGearItemAzeritePower[] Azerite_powers { get; set; }
    public DtoRaiderIoGearItemCorruption Corruption { get; set; }
    public int[] Gems { get; set; }
    public int[] Bonuses { get; set; }
  }
}