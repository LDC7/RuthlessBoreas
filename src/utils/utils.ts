export default class Utils {
  private static tankClasses = ['Death Knight', 'Demon Hunter', 'Druid', 'Monk', 'Paladin', 'Warrior'];
  private static healClasses = ['Druid', 'Monk', 'Paladin', 'Priest', 'Shaman'];
  
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

  public static getColorRaidProgress(raidProgress: string) {
    if (raidProgress.includes('M'))
      return Utils.getColorEpic();

    if (raidProgress.includes('H'))
      return Utils.getColorRare();

    if (raidProgress.includes('N') && raidProgress.startsWith('0'))
      return null;

    return Utils.getColorUncommon();
  }

  public static getColorKeyProgress(score: number) {
    if (score == 0)
      return null;

    if (score >= 1000)
      return Utils.getColorEpic();

    if (score >= 500)
      return Utils.getColorRare();

    return Utils.getColorUncommon();
  }
}