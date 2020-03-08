namespace RuthlessBoreas.Services
{
  using RuthlessBoreas.Models;
  using System;
  using System.Linq;

  public static class CharacterSortingService
  {
    private static bool ascSorting = false;

    public static int SortColumnNumber { get; private set; }

    private static int ComparingILvl(Character c)
    {
      return c.RaiderIo.ItemLevel * (ascSorting ? 1 : -1);
    }

    private static int ComparingRaidProgress(Character c)
    {
      var difficult = c.RaiderIo.RaidProgress[c.RaiderIo.RaidProgress.Length - 1];
      var progress = int.Parse(c.RaiderIo.RaidProgress.Substring(0, c.RaiderIo.RaidProgress.IndexOf('/')));
      var difficultNum = difficult == 'M' ? 300 : (difficult == 'H' ? 200 : 100);

      return (difficultNum + progress) * (ascSorting ? 1 : -1);
    }

    private static int ComparingKeyProgressTank(Character c)
    {
      int result;
      if (c.RaiderIo.ScoreTank.HasValue)
        result = c.RaiderIo.ScoreTank.Value * (ascSorting ? 1 : -1);
      else
        result = 100000;

      return result;
    }

    private static int ComparingKeyProgressHeal(Character c)
    {
      int result;
      if (c.RaiderIo.ScoreHealer.HasValue)
        result = c.RaiderIo.ScoreHealer.Value * (ascSorting ? 1 : -1);
      else
        result = 100000;

      return result;
    }

    private static int ComparingKeyProgressDps(Character c)
    {
      return c.RaiderIo.ScoreDps * (ascSorting ? 1 : -1);
    }

    private static int ComparingKeyProgressAll(Character c)
    {
      return c.RaiderIo.ScoreAll * (ascSorting ? 1 : -1);
    }

    private static int ComparingKey(Dungeon d)
    {
      if (d == null)
        return 0;

      return Dungeon.ComparingKey(d) * (ascSorting ? 1 : -1);
    }

    private static int ComparingMaxWeekKey(Character c)
    {
      return ComparingKey(c.RaiderIo.MaxWeekKey);
    }

    private static int ComparingMaxSeasonKey(Character c)
    {
      return ComparingKey(c.RaiderIo.MaxSeasonKey);
    }

    private static int ComparingMainAlt(Character c)
    {
      return (c.Main.Id == c.Id ? 1 : -1) * (ascSorting ? 1 : -1);
    }

    private static void ToggleSelectedColumn(int column)
    {
      if (column == SortColumnNumber)
      {
        ascSorting = !ascSorting;
      }
      else
      {
        SortColumnNumber = column;
        ascSorting = false;
      }
    }

    public static void OnTableHeaderClickHandler(int column)
    {
      ToggleSelectedColumn(column);
      Func<Character, int> sortingFunction = null;
      switch(column)
      {
        case 1:
          if (ascSorting)
            StorageService.Characters = StorageService.Characters.OrderBy(character => character.Name);
          else
            StorageService.Characters = StorageService.Characters.OrderByDescending(character => character.Name);
          return;
        case 2:
          sortingFunction = ComparingILvl;
          break;
        case 3:
          sortingFunction = ComparingRaidProgress;
          break;
        case 4:
          sortingFunction = ComparingKeyProgressTank;
          break;
        case 5:
          sortingFunction = ComparingKeyProgressHeal;
          break;
        case 6:
          sortingFunction = ComparingKeyProgressDps;
          break;
        case 7:
          sortingFunction = ComparingKeyProgressAll;
          break;
        case 8:
          sortingFunction = ComparingMaxWeekKey;
          break;
        case 9:
          sortingFunction = ComparingMaxSeasonKey;
          break;
      }

      StorageService.Characters = StorageService.Characters.OrderBy(character => sortingFunction?.Invoke(character));
    }
  }
}
