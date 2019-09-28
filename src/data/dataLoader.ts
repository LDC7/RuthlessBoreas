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

  public static GetCharacters(): Array<Promise<Character>> {
    const chars = DataLoader.LoadCharsIdentity();
    const data = new Array<Promise<Character>>(chars.length);

    for(let i = 0; i < chars.length; i++) {
      data.push(new Promise((resolve) => {
        DataLoader.getRequest(DataLoader.GetCharRaiderIoUrl(chars[i])).then((char) => {
          resolve(new Character(i + 1, new RioCharacter(char)));
        })
      }));
    }

    return data;
  }
}
