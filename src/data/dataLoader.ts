import Character from '../models/character';
import CharacterIdentity from '../models/characteridentity';
import CharacterSortingService from '../service/characterSortingService';
import StoreService from '../service/storeservice';
import RioCharacter from '../models/riocharacter';

const serversTranslation: any = require('./ruservers.json');

export default class DataLoader {

  private static loadCharsIdentity(): Array<CharacterIdentity> {    
    const serializedData = require('./charsdata.json') as Array<any>;
    const chars = new Array<CharacterIdentity>();

    serializedData.forEach((val) => {
      const char = new CharacterIdentity();
      char.Id = val.id;
      char.Name = val.name;
      char.Realm = val.realm;
      char.Region = val.region;
      char.Main = val.main;

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

  private static getCharArmoryProfileUrl(char: CharacterIdentity): string {
    const name = encodeURIComponent(char.Name);
    return `https://worldofwarcraft.com/ru-ru/character/${char.Region}/${char.Realm}/${name}`;
  }

  private static async getCharacters(): Promise<Array<Character>> {
    const chars = DataLoader.loadCharsIdentity();
    const promises = new Array<Promise<any>>();
    const data = new Array<Character>();

    chars.forEach((val) => {
      promises.push(DataLoader.getRequest(RioCharacter.getCharRaiderIoUrl(val)));
    });

    for(let i = 0; i < chars.length; i++) {
      const rioChar = new RioCharacter(await promises[i]);
      data.push(new Character(chars[i],
        rioChar,
        DataLoader.getCharWlogsProfileUrl(chars[i]),
        DataLoader.getCharArmoryProfileUrl(chars[i])));
    }

    return new Promise<Array<Character>>((resolve) => resolve(data));
  }

  public static async loadCharacters(): Promise<void> {
    return DataLoader.getCharacters().then((chars) => {
      chars.map(char => char.setMainName(chars));
      StoreService.setState({
        characters: chars,
        sortedCharacterIds: chars.sort((a, b) => CharacterSortingService.comparingMainAlt(b, a, true)).map(char => char.Id)
      });
    });
  }
}
