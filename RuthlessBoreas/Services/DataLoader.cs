namespace RuthlessBoreas.Services
{
  using Microsoft.AspNetCore.Components;
  using RuthlessBoreas.Models;
  using RuthlessBoreasDataContainer.Data;
  using System.Linq;
  using System.Net.Http;
  using System.Threading.Tasks;

  public static class DataLoader
  {
    internal const string WARCRAFT_LOGS_API_KEY = "4f8d4c84501bdcd07b3d2306dd2b6414";

    private static HttpClient Http { get; set; }

    public static void Initialize(HttpClient client)
    {
      Http = client;
      StorageService.SetServers(ServersData.Get().Select(data => new WowServer(data)));
      StorageService.Characters = CharactersIdentityData.Get().Select(identity => new Character(identity));
    }

    public static async Task<T> GetRequest<T>(string url) where T : class
    {
      return await Http.GetJsonAsync<T>(url);
    }
  }
}
