﻿namespace RuthlessBoreas.Models
{
  using RuthlessBoreas.Models.Dto;
  using RuthlessBoreas.Services;
  using System;
  using System.Linq;
  using System.Threading.Tasks;
  using System.Web;

  public class Character
  {
    private const string WARCRAFT_LOGS_API_KEY = "4f8d4c84501bdcd07b3d2306dd2b6414";

    public int Id { get; }
    public string Name { get; }
    public WowServer Server { get; }
    public string Region { get; }

    private readonly Lazy<Character> mainCharacter;
    public Character Main => this.mainCharacter.Value;

    public string RioDataUrl { get; private set; }
    public string WarcraftLogsProfileUrl { get; private set; }
    public string WarcraftLogsDpsDataUrl { get; private set; }
    public string WarcraftLogsHpsDataUrl { get; private set; }
    public string ArmoryProfileUrl { get; private set; }

    public RioCharacter RaiderIo { get; private set; }
    public bool IsWarcraftLogsDataLoaded { get; private set; }
    public WarcraftLogsCharacter WarcraftLogs { get; private set; }

    public Character(CharacterIdentity identity)
    {
      Console.WriteLine($"Create {typeof(Character)}: {identity.Name}");
      this.Id = identity.Id;
      this.Name = identity.Name;
      this.mainCharacter = new Lazy<Character>(() => this.SetMain(identity.Main));
      this.Server = StorageService.Servers.First(server => server.Id == identity.Realm);
      this.Region = identity.Region;

      this.SetProfileUrls();
    }

    private Character SetMain(int mainId)
    {
      return this.Id == mainId ? this : StorageService.Characters.Single(character => character.Id == mainId);
    }

    private void SetProfileUrls()
    {
      var fields = "gear%2Craid_progression%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_weekly_highest_level_runs%2Cmythic_plus_highest_level_runs";
      var name = HttpUtility.UrlEncode(this.Name);
      this.RioDataUrl = $"https://raider.io/api/v1/characters/profile?region={this.Region}&realm={this.Server.Name}&name={name}&fields={fields}";

      var ruServer = HttpUtility.UrlEncode(this.Server.RuName);
      this.WarcraftLogsProfileUrl = $"https://www.warcraftlogs.com/character/{this.Region}/{ruServer}/{name}";
      this.WarcraftLogsDpsDataUrl = $"https://www.warcraftlogs.com/v1/parses/character/{name}/{ruServer}/{this.Region}?api_key={WARCRAFT_LOGS_API_KEY}&metric=dps&mode=detailed#private=1";
      this.WarcraftLogsHpsDataUrl = $"https://www.warcraftlogs.com/v1/parses/character/{name}/{ruServer}/{this.Region}?api_key={WARCRAFT_LOGS_API_KEY}&metric=hps&mode=detailed#private=1";

      this.ArmoryProfileUrl = $"https://worldofwarcraft.com/ru-ru/character/{this.Region}/{this.Server.Name}/{name}";
    }

    public async Task LoadRioData()
    {
      var rioDto = await DataLoader.GetRequest<DtoRaiderIo>(this.RioDataUrl);
      this.RaiderIo = new RioCharacter(rioDto);
    }

    public async Task LoadWarcraftLogsData()
    {
      var dpsDto = await DataLoader.GetRequest<DtoWarcraftLogs[]>(this.WarcraftLogsDpsDataUrl);
      var hpsDto = await DataLoader.GetRequest<DtoWarcraftLogs[]>(this.WarcraftLogsHpsDataUrl);
      this.WarcraftLogs = new WarcraftLogsCharacter(dpsDto, hpsDto);
      this.IsWarcraftLogsDataLoaded = true;
    }
  }
}
