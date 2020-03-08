namespace RuthlessBoreas.Services
{
  using System.Linq;

  public static class Utils
  {
    private static readonly string[] tankClasses = { "Death Knight", "Demon Hunter", "Druid", "Monk", "Paladin", "Warrior" };
    private static readonly string[] healClasses = { "Druid", "Monk", "Paladin", "Priest", "Shaman" };

    private static int LegendKeyScore => StorageService.KeyScoreData.LegendKeyScore;
    private static int EpicKeyScore => StorageService.KeyScoreData.EpicKeyScore;
    private static int RareKeyScore => StorageService.KeyScoreData.RareKeyScore;

    public static string GetColorClass(string className)
    {
      switch (className)
      {
        case "Death Knight":
          return "#d52d3c";
        case "Demon Hunter":
          return "#a330c9";
        case "Druid":
          return "#f07c23";
        case "Hunter":
          return "#9bc075";
        case "Mage":
          return "#8bdefb";
        case "Monk":
          return "#37a587";
        case "Paladin":
          return "#f292ac";
        case "Priest":
          return "#dcdcdc";
        case "Rogue":
          return "#ffef70";
        case "Shaman":
          return "#2686df";
        case "Warlock":
          return "#9482c9";
        case "Warrior":
          return "#c79c6e";
        default:
          return "#162c44";
      }
    }

    public static bool CanTank(string className)
    {
      return Utils.tankClasses.Any(val => val == className);
    }

    public static bool CanHeal(string className)
    {
      return Utils.healClasses.Any(val => val == className);
    }

    public static string GetColorUncommon()
    {
      return "#1eff00";
    }

    public static string GetColorRare()
    {
      return "#0070dd";
    }

    public static string GetColorEpic()
    {
      return "#a335ee";
    }

    public static string GetColorLegend()
    {
      return "#ff8000";
    }

    public static string GetColorRaidProgress(string raidProgress)
    {
      System.Console.WriteLine($"|{raidProgress}|");
      if (raidProgress.Contains('M'))
      {
        var slashIndex = raidProgress.IndexOf('/');
        var spaceIndex = raidProgress.IndexOf(' ');
        var progress = raidProgress.Substring(0, slashIndex);
        var max = raidProgress.Substring(slashIndex + 1, spaceIndex - slashIndex - 1);
        if (progress == max)
          return Utils.GetColorLegend();

        return Utils.GetColorEpic();
      }

      if (raidProgress.Contains('H'))
        return Utils.GetColorRare();

      if (raidProgress.StartsWith('0'))
        return null;

      return Utils.GetColorUncommon();
    }

    public static string GetColorKeyProgress(int score)
    {
      if (score == 0)
        return null;

      if (score >= Utils.LegendKeyScore)
        return Utils.GetColorLegend();

      if (score >= Utils.EpicKeyScore)
        return Utils.GetColorEpic();

      if (score >= Utils.RareKeyScore)
        return Utils.GetColorRare();

      return Utils.GetColorUncommon();
    }

    public static string GetColorPercentage(int percent)
    {
      if (percent >= 90)
        return Utils.GetColorLegend();

      if (percent >= 75)
        return Utils.GetColorEpic();

      if (percent >= 50)
        return Utils.GetColorRare();

      return Utils.GetColorUncommon();
    }

    public static string GetColorMaxKey(int keyLevel)
    {
      if (keyLevel == 0)
        return null;

      if (keyLevel >= 15)
        return Utils.GetColorLegend();

      if (keyLevel >= 10)
        return Utils.GetColorEpic();

      if (keyLevel >= 5)
        return Utils.GetColorRare();

      return Utils.GetColorUncommon();
    }
  }
}
