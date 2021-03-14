namespace RuthlessBoreas.Models
{
  using RuthlessBoreas.Models.Dto;
  using RuthlessBoreas.Services;
  using RuthlessBoreasDataContainer.Models;
  using System;
  using System.Linq;
  using System.Threading.Tasks;
  using System.Web;

  public class Character
  {
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
    public bool IsEmpty { get; private set; }
    public bool IsWarcraftLogsDataLoaded { get; private set; }
    public WarcraftLogsCharacter WarcraftLogs { get; private set; }

    public Character(CharacterIdentity identity)
    {
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
      var fields = "guild%2Cgear%2Craid_progression%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_weekly_highest_level_runs%2Cmythic_plus_highest_level_runs";
      var name = HttpUtility.UrlEncode(this.Name);
      this.RioDataUrl = $"https://raider.io/api/v1/characters/profile?region={this.Region}&realm={this.Server.Name}&name={name}&fields={fields}";

      var ruServer = HttpUtility.UrlEncode(this.Server.RuName);
      this.WarcraftLogsProfileUrl = $"https://www.warcraftlogs.com/character/{this.Region}/{ruServer}/{name}";
      this.WarcraftLogsDpsDataUrl = $"https://www.warcraftlogs.com/v1/parses/character/{name}/{ruServer}/{this.Region}?api_key={DataLoader.WARCRAFT_LOGS_API_KEY}&metric=dps&mode=detailed#private=1";
      this.WarcraftLogsHpsDataUrl = $"https://www.warcraftlogs.com/v1/parses/character/{name}/{ruServer}/{this.Region}?api_key={DataLoader.WARCRAFT_LOGS_API_KEY}&metric=hps&mode=detailed#private=1";

      this.ArmoryProfileUrl = $"https://worldofwarcraft.com/ru-ru/character/{this.Region}/{this.Server.Name}/{name}";
    }

    public async Task LoadRioData()
    {
      var cacheKey = $"RioCache{this.Id}";
      RioDataCache cache = null;
      if (await StorageService.IsLocalStorageCacheValid.ConfigureAwait(false) &&
        await StorageService.LocalStorage.ContainKeyAsync(cacheKey).ConfigureAwait(false))
        cache = await StorageService.LocalStorage.GetItemAsync<RioDataCache>(cacheKey).ConfigureAwait(false);

      if (cache == null || DateTime.UtcNow.Subtract(cache.DateTime) > TimeSpan.FromHours(1))
      {
        var rioDto = await DataLoader.GetRequest<DtoRaiderIo>(this.RioDataUrl);
        if (rioDto != null)
        {
          cache = new RioDataCache()
          {
            DateTime = DateTime.UtcNow,
            RioDto = rioDto
          };
          StorageService.LocalStorage.SetItemAsync(cacheKey, cache).ConfigureAwait(false);
        }
      }

      this.RaiderIo = cache != null ? new RioCharacter(cache.RioDto) : null;
      this.IsEmpty = this.RaiderIo == null || (this.RaiderIo.ScoreAll == 0 && (this.RaiderIo.RaidProgress == null || this.RaiderIo.RaidProgress.StartsWith("0")));
    }

    public async Task LoadWarcraftLogsData()
    {
      var dpsDto = DataLoader.GetRequest<DtoWarcraftLogs[]>(this.WarcraftLogsDpsDataUrl);
      var hpsDto = DataLoader.GetRequest<DtoWarcraftLogs[]>(this.WarcraftLogsHpsDataUrl);
      this.WarcraftLogs = new WarcraftLogsCharacter(await dpsDto, await hpsDto);
      this.IsWarcraftLogsDataLoaded = true;
    }
  }
}
