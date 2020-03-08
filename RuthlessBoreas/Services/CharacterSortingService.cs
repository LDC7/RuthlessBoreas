namespace RuthlessBoreas.Services
{
  using RuthlessBoreas.Models;

  public static class CharacterSortingService
  {
    public static int ComparingILvl(Character c, bool asc)
    {
      return c.RaiderIo.ItemLevel * (asc ? 1 : -1);
    }

    public static int ComparingRaidProgress(Character c, bool asc)
    {
      var difficult = c.RaiderIo.RaidProgress[c.RaiderIo.RaidProgress.Length - 1];
      var progress = int.Parse(c.RaiderIo.RaidProgress.Substring(0, c.RaiderIo.RaidProgress.IndexOf('/')));
      var difficultNum = difficult == 'M' ? 300 : (difficult == 'H' ? 200 : 100);

      return (difficultNum + progress) * (asc ? 1 : -1);
    }

    public static int ComparingKeyProgressTank(Character c, bool asc)
    {
      int result;
      if (c.RaiderIo.ScoreTank.HasValue)
        result = c.RaiderIo.ScoreTank.Value * (asc ? 1 : -1);
      else
        result = 100000;

      return result;
    }

    public static int ComparingKeyProgressHeal(Character c, bool asc)
    {
      int result;
      if (c.RaiderIo.ScoreHealer.HasValue)
        result = c.RaiderIo.ScoreHealer.Value * (asc ? 1 : -1);
      else
        result = 100000;

      return result;
    }

    public static int ComparingKeyProgressDps(Character c, bool asc)
    {
      return c.RaiderIo.ScoreDps * (asc ? 1 : -1);
    }

    public static int ComparingKeyProgressAll(Character c, bool asc)
    {
      return c.RaiderIo.ScoreAll * (asc ? 1 : -1);
    }

    private static int ComparingKey(Dungeon d, bool asc)
    {
      if (d == null)
        return 0;

      return Dungeon.ComparingKey(d) * (asc ? 1 : -1);
    }

    public static int ComparingMaxWeekKey(Character c, bool asc)
    {
      return ComparingKey(c.RaiderIo.MaxWeekKey, asc);
    }

    public static int ComparingMaxSeasonKey(Character c, bool asc)
    {
      return ComparingKey(c.RaiderIo.MaxSeasonKey, asc);
    }

    public static int ComparingMainAlt(Character c, bool asc)
    {
      return (c.Main.Id == c.Id ? 1 : -1) * (asc ? 1 : -1);
    }
  }
}
