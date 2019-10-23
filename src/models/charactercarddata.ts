import DataLoader from '../data/dataloader';

import CharacterIdentity from './characteridentity';

export default class CharacterCardData {
  private Identity: CharacterIdentity
  public IsLoaded: boolean;
  public AverageDps: number;
  public AverageHps: number;
  public PortraitUrl: string;

  public constructor(identity: CharacterIdentity, portraitUrl: string) {
    this.Identity = identity;
    this.PortraitUrl = portraitUrl;
    this.IsLoaded = false;
  }

  public async load(): Promise<void> {
    if (!this.IsLoaded) {
      return DataLoader.getWlogsCharacterData(this.Identity).then(data => {
        this.AverageDps = data.AverageDps;
        this.AverageHps = data.AverageHps;
        this.IsLoaded = true;
      });
    }
  }
}