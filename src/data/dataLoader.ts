import Char from './char';

export default class DataLoader {

  private static LoadChars(): Array<Char> {    
    const serializedData = require('./data.json') as Array<any>;
    const chars = new Array<Char>();

    for(let i = 0; i < serializedData.length; i++) {
      chars[i] = new Char();
      chars[i].Name = serializedData[i].name;
      chars[i].Realm = serializedData[i].realm;
      chars[i].Region = serializedData[i].region;
    }

    return chars;
  }

  private static getRequest(url: string): Promise<any> {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    return request.response;
  }

  /*private static getRequest2(url: string): Promise<any> {
    return new Promise<any>(
      function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.onload = function () {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
        request.onerror = function () {
          reject(new Error('XMLHttpRequest Error: ' + this.statusText));
        };
      request.open('GET', url);
      request.send();
      }
    );
  }*/

  private static GetCharRaiderIoUrl(char: Char): string {
    console.log(char);
    const name = encodeURIComponent(char.Name);
    console.log(char.Name);
    console.log(name);
    return `https://raider.io/api/v1/characters/profile?region=${char.Region}&realm=${char.Realm}&name=${name}`;
  }

  public static GetCharacters(): Array<Char> {
    const chars = DataLoader.LoadChars();
    console.log(chars);

    console.error(DataLoader.getRequest(DataLoader.GetCharRaiderIoUrl(chars[0])));
    

    return chars;
  }
}
