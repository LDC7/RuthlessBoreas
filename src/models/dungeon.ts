export default class Dungeon {
  public KeyLevel: number;
  public Name: string | null;
  public ShortName: string | null;
  public Score: number;

  public constructor(name: string, shortName: string, score: number, keyLvl: number) {
    this.KeyLevel = keyLvl;
    this.Name =  name;
    this.ShortName = shortName;
    this.Score = score;
  }

  public getKeyString(): string | null {
    if (this.KeyLevel != null)
      return `${this.KeyLevel} ${this.ShortName}`;

    return null;
  }
}