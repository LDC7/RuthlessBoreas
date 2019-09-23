import CharacterIdentity from '../models/characterIdentity';
import RioCharacter from '../models/rioCharacter';
import Character from '../models/character';

export default class DataLoader {

  private static LoadCharsIdentity(): Array<CharacterIdentity> {    
    const serializedData = require('./charsData.json') as Array<any>;
    const chars = new Array<CharacterIdentity>();

    serializedData.forEach((val) => {
      const char = new CharacterIdentity();
      char.Name = val.name;
      char.Realm = val.realm;
      char.Region = val.region;

      chars.push(char);
    });

    return chars;
  }

  private static RawAnyDataToRioChar(data: any): RioCharacter {
    const char = new RioCharacter();
    console.log(data);
    const raidName = require('./raidData.json').lastRaid;

    char.Name = data.name;
    char.Class = data.class;
    char.Thumbnail_url = data.thumbnail_url;
    char.Profile_url = data.profile_url;
    char.Gear_item_level_total = data.gear.item_level_total;
    const score = data.mythic_plus_scores_by_season[0].scores;
    char.Mythic_plus_score_all = score.all;
    char.Mythic_plus_score_dps = score.dps;
    char.Mythic_plus_score_healer = score.healer;
    char.Mythic_plus_score_tank = score.tank;
    char.Raid_progression_summary = data.raid_progression[raidName].summary;
    return char;
  }

  private static async getRequest(url: string): Promise<any> {
    return new Promise((resolve, reject) =>{
      const request = new XMLHttpRequest();
      request.onload = function () {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function () {
        reject(new Error('XMLHttpRequest Error: ' + this.statusText));
      };
      request.open('GET', url);
      request.send();
    });
  }

  private static GetCharRaiderIoUrl(char: CharacterIdentity): string {
    const name = encodeURIComponent(char.Name);
    const fields = 'gear%2Craid_progression%2Cmythic_plus_scores_by_season%3Acurrent';
    return `https://raider.io/api/v1/characters/profile?region=${char.Region}&realm=${char.Realm}&name=${name}&fields=${fields}`;
  }

  public static async GetCharacters(): Promise<Array<Character>> {
    const chars = DataLoader.LoadCharsIdentity();
    const data = new Array<Character>();
    
    for(let i = 0; i < chars.length; i++) {
      const rioChar = DataLoader.RawAnyDataToRioChar(await DataLoader.getRequest(DataLoader.GetCharRaiderIoUrl(chars[i])));
      data.push(new Character(i + 1, rioChar));
    }

    return new Promise<Array<Character>>((resolve) => resolve(data));
  }
}
