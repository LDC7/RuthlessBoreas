import CharacterIdentity from '../models/characterIdentity';
import RioCharacter from '../models/rioCharacter';
import Character from '../models/character';
import WlogsCharacter from '../models/wlogsCharacter';

export default class DataLoader {

  private static loadCharsIdentity(): Array<CharacterIdentity> {    
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
  
  public static async getCharacters(): Promise<Array<Character>> {
    const chars = DataLoader.loadCharsIdentity();
    const rioPromises = new Array<Promise<any>>();
    const wlogsDpsPromises = new Array<Promise<any>>();
    const wlogsHpsPromises = new Array<Promise<any>>();
    const data = new Array<Character>();

    chars.forEach((val) => {
      rioPromises.push(DataLoader.getRequest(RioCharacter.getCharRaiderIoUrl(val)));
      wlogsDpsPromises.push(DataLoader.getRequest(WlogsCharacter.getWlogsRankingUrl(val, 'dps')));
      wlogsHpsPromises.push(DataLoader.getRequest(WlogsCharacter.getWlogsRankingUrl(val, 'hps')));
    });

    for(let i = 0; i < chars.length; i++) {
      const rioChar = new RioCharacter(await rioPromises[i]);
      const wlogsChar = new WlogsCharacter(chars[i], await wlogsDpsPromises[i], await wlogsHpsPromises[i]);
      data.push(new Character(i + 1, rioChar, wlogsChar));
    }

    return new Promise<Array<Character>>((resolve) => resolve(data));
  }
}
