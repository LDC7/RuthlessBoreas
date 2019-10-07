export default class Dungeon {
  public KeyLevel: number;
  public Name: string | null;
  public ShortName: string | null;
  public Score: number;
  public KeyUp: number;
  private keyStr: string | null;

  public constructor(name: string, shortName: string, score: number, keyLvl: number, keyUpgrade: number) {
    this.KeyLevel = keyLvl;
    this.Name =  name;
    this.ShortName = shortName;
    this.Score = score;
    this.KeyUp = keyUpgrade;
    this.keyStr = null
  }

  public getKeyString(): string | null {
    if (this.keyStr != null)
      return this.keyStr;

    if (this.KeyLevel != null) {
      this.keyStr = `${this.KeyLevel}${'+'.repeat(this.KeyUp)} ${this.ShortName}`;
      return this.keyStr;
    }

    return null;
  }

  public static comparingKey(f: Dungeon, s: Dungeon): number {
    if (f.KeyLevel == s.KeyLevel)
      return f.Score - s.Score;

    return f.KeyLevel - s.KeyLevel;
  }
}