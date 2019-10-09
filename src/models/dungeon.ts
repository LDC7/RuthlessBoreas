import TimeSpan from "./timespan";

export default class Dungeon {
  public KeyLevel: number;
  public Name: string | null;
  public ShortName: string | null;
  public Score: number;
  public KeyUp: number;
  private keyStr: string | null;
  private timeSpan: TimeSpan;
  private nameWithTime: string | null;

  public constructor(name: string, shortName: string, score: number, keyLvl: number, keyUpgrade: number, time: number) {
    this.KeyLevel = keyLvl;
    this.Name =  name;
    this.ShortName = shortName;
    this.Score = score;
    this.KeyUp = keyUpgrade;
    this.keyStr = null;
    this.timeSpan = new TimeSpan(0, 0, 0, time);
    this.nameWithTime = null;
  }

  public getKeyString(): string | null {
    if (this.KeyLevel == null)
      return null;

    if (this.keyStr == null)
      this.keyStr = `${this.KeyLevel}${'+'.repeat(this.KeyUp)} ${this.ShortName}`;
      
    return this.keyStr;
  }

  public getNameWithTime(): string | null {
    if (this.KeyLevel == null)
      return null;

    if (this.nameWithTime == null)
      this.nameWithTime = `${this.Name} (${this.timeSpan.GetTimeString()})`;
    
    return this.nameWithTime;
  }

  public static comparingKey(f: Dungeon, s: Dungeon): number {
    if (f.KeyLevel == s.KeyLevel)
      return f.Score - s.Score;

    return f.KeyLevel - s.KeyLevel;
  }
}