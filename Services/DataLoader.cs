namespace RuthlessBoreas.Services
{
  using Microsoft.AspNetCore.Components;
  using RuthlessBoreas.Models;
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Net.Http;
  using System.Threading.Tasks;

  public static class DataLoader
  {
    private const string CHARACTERS_IDENTITY_DATA = "data/charsData.json";
    private const string SERVERS_DATA = "data/servers.json";
    private const string KEY_DATA = "data/keyData.json";

    private static HttpClient Http { get; set; }

    public static void Initialize(HttpClient client)
    {
      Console.WriteLine($"START {nameof(Initialize)} {nameof(DataLoader)}");
      Http = client;
      Console.WriteLine($"DONE {nameof(Initialize)} {nameof(DataLoader)}");
    }

    public static async Task<T> GetRequest<T>(string url) where T : class
    {
      Console.WriteLine($"START Request: {url}");
      var requestedData = await Http.GetJsonAsync<T>(url);
      Console.WriteLine($"DONE Request: {url}");
      return requestedData;
    }

    private static async Task<KeyData> LoadKeyData()
    {
      var data = await GetRequest<KeyData>(KEY_DATA);
      return data;
    }

    private static async Task<ServerData[]> LoadServersData()
    {
      var servers = await GetRequest<ServerData[]>(SERVERS_DATA);
      return servers;
    }

    private static async Task<CharacterIdentity[]> LoadCharactersIdentityData()
    {
      var charactersIdentity = await GetRequest<CharacterIdentity[]>(CHARACTERS_IDENTITY_DATA);
      return charactersIdentity;
    }

    public class DtoTest
    {
      public Dictionary<string, DtoTest> Raid_progression { get; set; }
      public object Gem { get; set; }
    }

    public static async Task LoadInitializeData()
    {
      var keyDataTask = LoadKeyData();
      var serversTask = LoadServersData();
      var identitiesTask = LoadCharactersIdentityData();

      var keyData = await keyDataTask;
      Console.WriteLine(keyData.LegendKeyScore);
      StorageService.SetKeyScoreData(keyData);

      var servers = await serversTask;
      Console.WriteLine($"Servers loaded: {servers.Length}");
      StorageService.SetServers(servers.Select(data => new WowServer(data)));

      var identities = await identitiesTask;
      Console.WriteLine($"CharacterIds loaded: {identities.Length}");
      foreach (var identity in identities)
      {
        StorageService.AddCharacter(new Character(identity));
      }

      StorageService.SortedCharacterIds = StorageService.Characters.Select(character => character.Id);
      Console.WriteLine($"Characters initialized");
    }
  }
}
