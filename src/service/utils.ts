const keyScoreData = require('../data/keydata.json');

export default class Utils {
  private static tankClasses = ['Death Knight', 'Demon Hunter', 'Druid', 'Monk', 'Paladin', 'Warrior'];
  private static healClasses = ['Druid', 'Monk', 'Paladin', 'Priest', 'Shaman'];
  private static legendKeyScore = keyScoreData.legendKeyScore;
  private static epicKeyScore = keyScoreData.epicKeyScore;
  private static rareKeyScore = keyScoreData.rareKeyScore;
  
  public static getColorClass(className: string): string {
    switch(className) {
      case 'Death Knight':
        return '#d52d3c';
      case 'Demon Hunter':
        return '#a330c9';
      case 'Druid':
        return '#f07c23';
      case 'Hunter':
        return '#9bc075';
      case 'Mage':
        return '#8bdefb';
      case 'Monk':
        return '#37a587';
      case 'Paladin':
        return '#f292ac';
      case 'Priest':
        return '#dcdcdc'
      case 'Rogue':
        return '#ffef70';
      case 'Shaman':
        return '#2686df';
      case 'Warlock':
        return '#9482c9';
      case 'Warrior':
        return '#c79c6e';
      default:
        return '#162c44';
    }
  }

  public static canTank(className: string): boolean {
    return Utils.tankClasses.some((val) => val == className);
  }

  public static canHeal(className: string): boolean {
    return Utils.healClasses.some((val) => val == className);
  }

  public static getColorUncommon(): string {
    return '#1eff00';
  }

  public static getColorRare(): string {
    return '#0070dd';
  }

  public static getColorEpic(): string {
    return '#a335ee';
  }

  public static getColorLegend(): string {
    return '#ff8000';
  }

  public static getColorRaidProgress(raidProgress: string) {
    if (raidProgress.includes('M')) {
      const slashIndex = raidProgress.indexOf('/');
      const spaceIndex = raidProgress.indexOf(' ');
      const progress = raidProgress.substr(0, slashIndex);
      const max = raidProgress.substr(slashIndex + 1, spaceIndex - slashIndex - 1);
      if (progress == max)
        return Utils.getColorLegend();  

      return Utils.getColorEpic();
    }

    if (raidProgress.includes('H'))
      return Utils.getColorRare();

    if (raidProgress.includes('N') && raidProgress.startsWith('0'))
      return null;

    return Utils.getColorUncommon();
  }

  public static getColorKeyProgress(score: number) {
    if (score == 0)
      return null;

    if (score >= Utils.legendKeyScore)
      return Utils.getColorLegend();

    if (score >= Utils.epicKeyScore)
      return Utils.getColorEpic();

    if (score >= Utils.rareKeyScore)
      return Utils.getColorRare();

    return Utils.getColorUncommon();
  }

  public static getColorPercentage(percent: number) {
    if (percent >= 90)
      return Utils.getColorLegend();

    if (percent >= 75)
      return Utils.getColorEpic();

    if (percent >= 50)
      return Utils.getColorRare();

    return Utils.getColorUncommon();
  }

  public static getColorMaxKey(keyLevel: number) {
    if (keyLevel == 0)
      return null;

    if (keyLevel >= 15)
      return Utils.getColorLegend();

    if (keyLevel >= 10)
      return Utils.getColorEpic();

    if (keyLevel >= 5)
      return Utils.getColorRare();
      
    return Utils.getColorUncommon();
  }
}
