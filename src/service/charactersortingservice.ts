import Character from '../models/character';
import Dungeon from '../models/dungeon';

export default class CharacterSortingService {
  
  public static comparingName(f: Character, s: Character, asc: boolean): number {
    return (f.Name == s.Name ? 0 : (f.Name > s.Name ? 1 : -1)) * (asc ? 1 : -1);
  }

  public static comparingILvl(f: Character, s: Character, asc: boolean): number {
    return (f.ItemLevel - s.ItemLevel) * (asc ? 1 : -1);
  }

  public static comparingRaidProgress(f: Character, s: Character, asc: boolean): number {
    const fDifficult = f.RaidProgress[f.RaidProgress.length - 1];
    const sDifficult = s.RaidProgress[s.RaidProgress.length - 1];

    if (fDifficult == sDifficult) {
      const fProgress = f.RaidProgress.substr(0, f.RaidProgress.indexOf('/'));
      const sProgress = s.RaidProgress.substr(0, s.RaidProgress.indexOf('/'));

      return parseInt(fProgress) - parseInt(sProgress);
    }

    if ((fDifficult == 'M' && sDifficult == 'H') || (fDifficult == 'H' && sDifficult == 'N'))
      return asc ? 1 : -1;

    if ((fDifficult == 'H' && sDifficult == 'M') || (fDifficult == 'N' && sDifficult == 'H'))
      return asc ? -1 : 1;

    return 0;
  }

  public static comparingKeyProgressTank(f: Character, s: Character, asc: boolean): number {
    if (f.ScoreTank == null && s.ScoreTank == null)
      return 0;

    if (f.ScoreTank == null)
      return 1;

    if (s.ScoreTank == null)
      return -1;

    return (f.ScoreTank - s.ScoreTank) * (asc ? 1 : -1);;
  }

  public static comparingKeyProgressHeal(f: Character, s: Character, asc: boolean): number {
    if (f.ScoreHealer == null && s.ScoreHealer == null)
      return 0;

    if (f.ScoreHealer == null)
      return 1;

    if (s.ScoreHealer == null)
      return -1;

    return (f.ScoreHealer - s.ScoreHealer) * (asc ? 1 : -1);;
  }

  public static comparingKeyProgressDps(f: Character, s: Character, asc: boolean): number {
    return (f.ScoreDps - s.ScoreDps) * (asc ? 1 : -1);
  }

  public static comparingKeyProgressAll(f: Character, s: Character, asc: boolean): number {
    return (f.ScoreAll - s.ScoreAll) * (asc ? 1 : -1);
  }

  private static comparingKey(f: Dungeon | null, s: Dungeon | null, asc: boolean): number {
    if (f == null && s == null)
      return 0;

    if (f == null)
      return 1;

    if (s == null)
      return -1;

    return Dungeon.comparingKey(f, s) * (asc ? 1 : -1);
  }

  public static comparingMaxWeekKey(f: Character, s: Character, asc: boolean): number {
    return CharacterSortingService.comparingKey(f.MaxWeekKey, s.MaxWeekKey, asc);
  }

  public static comparingMaxSeasonKey(f: Character, s: Character, asc: boolean): number {
    return CharacterSortingService.comparingKey(f.MaxSeasonKey, s.MaxSeasonKey, asc);
  }

  public static comparingMainAlt(f: Character, s: Character, asc: boolean): number {
    if ((f.MainId == f.Id && s.MainId == s.Id) || (f.MainId != f.Id && s.MainId != s.Id))
      return 0;
    
    if (f.MainId == f.Id)
      return asc ? 1 : -1;

    return asc ? -1 : 1;
  }
}
