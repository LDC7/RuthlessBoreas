namespace RuthlessBoreas.Services
{
  using RuthlessBoreasDataContainer.Data;
  using System.Linq;

  public static class Utils
  {
    private static readonly string[] tankClasses = { "Death Knight", "Demon Hunter", "Druid", "Monk", "Paladin", "Warrior" };
    private static readonly string[] healClasses = { "Druid", "Monk", "Paladin", "Priest", "Shaman" };

    public static string ColorLegend => "#ff8000";
    public static string ColorEpic => "#a335ee";
    public static string ColorRare => "#0070dd";
    public static string ColorUncommon => "#1eff00";

    public static string GetColorClass(string className)
    {
      return className switch
      {
        "Death Knight" => "#d52d3c",
        "Demon Hunter" => "#a330c9",
        "Druid" => "#f07c23",
        "Hunter" => "#9bc075",
        "Mage" => "#8bdefb",
        "Monk" => "#37a587",
        "Paladin" => "#f292ac",
        "Priest" => "#dcdcdc",
        "Rogue" => "#ffef70",
        "Shaman" => "#2686df",
        "Warlock" => "#9482c9",
        "Warrior" => "#c79c6e",
        _ => "#162c44"
      };
    }

    public static bool CanTank(string className)
    {
      return tankClasses.Any(val => val == className);
    }

    public static bool CanHeal(string className)
    {
      return healClasses.Any(val => val == className);
    }

    public static string GetColorRaidProgress(string raidProgress)
    {
      if (raidProgress.Contains('M'))
      {
        var slashIndex = raidProgress.IndexOf('/');
        var spaceIndex = raidProgress.IndexOf(' ');
        var progress = raidProgress.Substring(0, slashIndex);
        var max = raidProgress.Substring(slashIndex + 1, spaceIndex - slashIndex - 1);

        return progress == max ? Utils.ColorLegend : Utils.ColorEpic;
      }

      if (raidProgress.Contains('H'))
        return ColorRare;

      if (raidProgress.StartsWith('0'))
        return null;

      return ColorUncommon;
    }

    public static string GetColorKeyProgress(int score)
    {
      if (score == 0)
        return null;

      if (score >= KeyScoreData.LegendKeyScore)
        return ColorLegend;

      if (score >= KeyScoreData.EpicKeyScore)
        return ColorEpic;

      if (score >= KeyScoreData.RareKeyScore)
        return ColorRare;

      return ColorUncommon;
    }

    public static string GetColorPercentage(int percent)
    {
      if (percent >= 90)
        return ColorLegend;

      if (percent >= 75)
        return ColorEpic;

      if (percent >= 50)
        return ColorRare;

      return ColorUncommon;
    }

    public static string GetColorMaxKey(int keyLevel)
    {
      if (keyLevel == 0)
        return null;

      if (keyLevel >= 15)
        return ColorLegend;

      if (keyLevel >= 10)
        return ColorEpic;

      if (keyLevel >= 5)
        return ColorRare;

      return ColorUncommon;
    }
  }
}
