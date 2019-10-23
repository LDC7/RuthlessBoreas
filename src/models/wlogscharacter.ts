import CharacterIdentity from './characteridentity';

import Utils from '../service/utils';

const wlogsApiKey = require('../data/apikeydata.json').key;
const serversTranslation: any = require('../data/ruservers.json');

export default class WlogsCharacter {
  public AverageDps: number;
  public AverageHps: number;

  public constructor(dpsData: Array<any>, hpsData: Array<any>) {
    this.AverageDps = this.calculateAverage(dpsData);
    this.AverageHps = this.calculateAverage(hpsData);
  }

  private calculateAverage(data: Array<any>): number {
    const bestTotals = this.getBestPerEncounter(data);
    const sum = bestTotals.reduce((previous, current) => current += previous);
    return (sum/bestTotals.length);
  }

  private getBestPerEncounter(data: Array<any>): Array<number> {
    const encountersBest: Array<number> = [];
    const groupedByEncounter = Utils.groupBy(data, parse => parse.encounterName);
    groupedByEncounter.forEach((encounter: Array<any>) => {
      if (encounter.length != 0)        
        encountersBest.push(this.getBestForEncounter(encounter));
    });

    return encountersBest;
  }

  private getBestForEncounter(encounter: Array<any>): number {
    const sortedEncounter = encounter.sort((parse1, parse2) => parse2.difficulty - parse1.difficulty);
    const hardestEncounter = sortedEncounter.filter((value) => value.difficulty == sortedEncounter[0].difficulty);
    const totalSortedEncounter = hardestEncounter.sort((parse1, parse2) => parse2.total - parse1.total);
    return totalSortedEncounter[0];
  }

  public static getWlogsRankingUrl(char: CharacterIdentity, metric: string): string {    
    const name = encodeURIComponent(char.Name);
    const server = encodeURIComponent(serversTranslation[char.Realm]);
    return `https://www.warcraftlogs.com/v1/parses/character/${name}/${server}/${char.Region}?api_key=${wlogsApiKey}&metric=${metric}&mode=detailed#private=1`
  }
}