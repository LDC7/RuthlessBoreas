namespace RuthlessBoreas.Models
{
  using System;

  public class Dungeon
  {
    private readonly TimeSpan timeSpan;
    private readonly Lazy<string> keyString;
    private readonly Lazy<string> keyNameWithTime;

    public int? KeyLevel { get; }
    public string Name { get; }
    public string ShortName { get; }
    public int Score { get; }
    public int KeyUp { get; }
    public string KeyString => this.keyString.Value;
    public string KeyNameWithTime => this.keyNameWithTime.Value;

    public Dungeon(string name, string shortName, int score, int? keyLvl, int keyUpgrade, int time)
    {
      this.KeyLevel = keyLvl;
      this.Name = name;
      this.ShortName = shortName;
      this.Score = score;
      this.KeyUp = keyUpgrade;
      this.timeSpan = new TimeSpan(0, 0, 0, 0, time);
      this.keyString = new Lazy<string>(this.GetKeyString);
      this.keyNameWithTime = new Lazy<string>(this.GetNameWithTime);
    }

    public string GetKeyString()
    {
      var pluses = new string('+', this.KeyUp);
      return $"{this.KeyLevel}{pluses.ToString()}{this.ShortName}";
    }

    public string GetNameWithTime()
    {
      return $"{this.Name} ({this.timeSpan.ToString(@"hh\:mm\:ss\.fff")})";
    }

    public static int ComparingKey(Dungeon d)
    {
      return d.KeyLevel.Value * 10000 + d.Score;
    }
  }
}
