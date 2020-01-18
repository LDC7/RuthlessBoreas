import DataLoader from '../data/dataloader';
import Utils from '../service/utils';

import CharacterIdentity from './characteridentity';
import { IWlogsData } from './wlogscharacter';

export default class CharacterCardData {
  private Identity: CharacterIdentity
  public IsLoaded: boolean;
  public AverageDps: number;
  public AverageHps: number;
  public DpsPercent: number;
  public HpsPercent: number;
  public PortraitUrl: string;
  public Name: string;
  public ServerName: string;
  public Class: string;

  public constructor(identity: CharacterIdentity, portraitUrl: string) {
    this.Identity = identity;
    this.PortraitUrl = portraitUrl;
    this.IsLoaded = false;
    this.Name = identity.Name;
  }

  public async load(): Promise<void> {
    if (!this.IsLoaded) {
      return DataLoader.getWlogsCharacterData(this.Identity).then(data => {
        if (data.DpsData != null && data.DpsData.length > 0) {
          const bestDps = this.getBestPerEncounter(data.DpsData);
          const totalDps = bestDps.map(encounter => encounter.total);
          this.AverageDps = this.calculateAverage(totalDps);
          const totalDpsPercent = bestDps.map(encounter => encounter.percentile);
          this.DpsPercent = this.calculateAverage(totalDpsPercent);

          const bestHps = this.getBestPerEncounter(data.HpsData);
          const totalHps = bestHps.map(encounter => encounter.total);
          this.AverageHps = this.calculateAverage(totalHps);
          const totalHpsPercent = bestHps.map(encounter => encounter.percentile);
          this.HpsPercent = this.calculateAverage(totalHpsPercent);
          
          this.IsLoaded = true;
          this.ServerName = data.DpsData[0].server;
          this.Class = data.DpsData[0].class;
        }
      });
    }
  }

  private calculateAverage(numbers: Array<number>): number {
    const sum = numbers.reduce((previous, current) => current += previous);    
    return Math.round(sum/numbers.length);
  }

  private getBestPerEncounter(data: Array<IWlogsData>): Array<IWlogsData> {
    const encountersBest: Array<IWlogsData> = [];
    const groupedByEncounter = Utils.groupBy(data, parse => parse.encounterName);
    groupedByEncounter.forEach((encounter: Array<IWlogsData>) => {
      if (encounter.length != 0)        
        encountersBest.push(this.getBestForEncounter(encounter));
    });

    return encountersBest;
  }

  private getBestForEncounter(encounter: Array<IWlogsData>): IWlogsData {
    const sortedEncounter = encounter.sort((parse1, parse2) => parse2.difficulty - parse1.difficulty);
    const hardestEncounter = sortedEncounter.filter((value) => value.difficulty == sortedEncounter[0].difficulty);
    const totalSortedEncounter = hardestEncounter.sort((parse1, parse2) => parse2.total - parse1.total);
    return totalSortedEncounter[0];
  }
}