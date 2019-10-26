import CharacterIdentity from './characteridentity';

const wlogsApiKey = require('../data/apikeydata.json').key;
const serversTranslation: any = require('../data/ruservers.json');

interface ICharTalant {
  name: string;
  id: number;
  icon: string;
}

interface ICharItem {
  name: string;
  id: number;
  icon: string;
  quality: string;
}

export interface IWlogsData {
  encounterID: number;
  encounterName: string;
  class: string;
  spec: string;
  rank: number;
  outOf: number;
  duration: number;
  startTime: number;
  reportID: string;
  fightID: number;
  difficulty: number;
  characterID: number;
  characterName: string;
  server: string;
  percentile: number;
  ilvlKeyOrPatch: number;
  talents: Array<ICharTalant>;
  gear: Array<ICharItem>;
  total: number;
  estimated: boolean;
}

export default class WlogsCharacter {
  public DpsData: Array<IWlogsData>;
  public HpsData: Array<IWlogsData>;

  public constructor(dpsData: Array<any>, hpsData: Array<any>) {
    this.DpsData = dpsData;
    this.HpsData = hpsData;
  }
  
  public static getWlogsRankingUrl(char: CharacterIdentity, metric: string): string {    
    const name = encodeURIComponent(char.Name);
    const server = encodeURIComponent(serversTranslation[char.Realm]);
    return `https://www.warcraftlogs.com/v1/parses/character/${name}/${server}/${char.Region}?api_key=${wlogsApiKey}&metric=${metric}&mode=detailed#private=1`
  }
}