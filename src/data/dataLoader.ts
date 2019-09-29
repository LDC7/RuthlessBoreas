import Character from '../models/character';
import CharacterIdentity from '../models/characterIdentity';
import RioCharacter from '../models/rioCharacter';

const serversTranslation: any = require('./ruServers.json');

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

  private static getCharWlogsProfileUrl(char: CharacterIdentity): string {
    const name = encodeURIComponent(char.Name);
    const server = encodeURIComponent(serversTranslation[char.Realm]);
    return `https://www.warcraftlogs.com/character/${char.Region}/${server}/${name}`;
  }

  public static async getCharacters(): Promise<Array<Character>> {
    const chars = DataLoader.loadCharsIdentity();
    const promises = new Array<Promise<any>>();
    const data = new Array<Character>();

    chars.forEach((val) => {
      promises.push(DataLoader.getRequest(RioCharacter.getCharRaiderIoUrl(val)));
    });

    for(let i = 0; i < chars.length; i++) {
      const rioChar = new RioCharacter(await promises[i]);
      data.push(new Character(i + 1, rioChar, DataLoader.getCharWlogsProfileUrl(chars[i])));
    }

    return new Promise<Array<Character>>((resolve) => resolve(data));
  }
}
