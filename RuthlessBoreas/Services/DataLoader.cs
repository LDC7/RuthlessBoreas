﻿namespace RuthlessBoreas.Services
{
  using System.Linq;
  using System.Net.Http;
  using System.Net.Http.Json;
  using System.Threading.Tasks;
  using RuthlessBoreas.Models;
  using RuthlessBoreasDataContainer.Data;

  public static class DataLoader
  {
    internal const string WARCRAFT_LOGS_API_KEY = "4f8d4c84501bdcd07b3d2306dd2b6414";

    private static HttpClient Http { get; set; }

    public static void Initialize(HttpClient client)
    {
      Http = client;
    }

    public static async Task<T> GetRequest<T>(string url) where T : class
    {
      try
      {
        return await Http.GetFromJsonAsync<T>(url);
      }
      catch
      {
        return null;
      }
    }

    public static async Task LoadInitializeData()
    {
      var serversData = ServersData.Get();
      var charactersData = CharactersIdentityData.Get();

      StorageService.SetServers((await serversData).Select(data => new WowServer(data)));
      foreach (var identity in await charactersData)
      {
        StorageService.AddCharacter(new Character(identity));
      }

      StorageService.SortedCharacterIds = StorageService.Characters.Select(character => character.Id);
    }
  }
}
