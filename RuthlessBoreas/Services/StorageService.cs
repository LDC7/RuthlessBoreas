namespace RuthlessBoreas.Services
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Reflection;
  using System.Threading.Tasks;
  using Blazored.LocalStorage;
  using RuthlessBoreas.Models;

  public static class StorageService
  {
    private static Action sortedCharacterIdsSubscribtions;

    private static IEnumerable<int> sortedCharacterIds;

    public static IEnumerable<int> SortedCharacterIds
    {
      get => sortedCharacterIds;
      set
      {
        sortedCharacterIds = value;
        sortedCharacterIdsSubscribtions?.Invoke();
      }
    }

    private static readonly ICollection<Character> characters = new List<Character>();

    public static IEnumerable<Character> Characters => characters;

    public static IEnumerable<WowServer> Servers { get; private set; }

    public static ILocalStorageService LocalStorage { get; set; }

    private static readonly Lazy<Task<bool>> isLocalStorageCacheValid = new Lazy<Task<bool>>(CheckCacheAssemblyVersion);
    public static Task<bool> IsLocalStorageCacheValid => isLocalStorageCacheValid.Value;

    public static void SetServers(IEnumerable<WowServer> servers)
    {
      Servers = servers;
    }

    public static Character GetCharacter(int id)
    {
      return Characters.FirstOrDefault(character => character.Id == id);
    }

    internal static void AddCharacter(Character character)
    {
      characters.Add(character);
    }

    public static void SubscribeOnSortedCharacterIdsChange(Action handler)
    {
      sortedCharacterIdsSubscribtions += handler;
    }

    public static void UnsubscribeOnSortedCharacterIdsChange(Action handler)
    {
      sortedCharacterIdsSubscribtions -= handler;
    }

    private async static Task<bool> CheckCacheAssemblyVersion()
    {
      var cacheKey = "AssemblyVersion";
      var currentVersion = Assembly.GetExecutingAssembly().GetName().Version.ToString();
      if (await LocalStorage.ContainKeyAsync(cacheKey).ConfigureAwait(false))
      {
        var cacheVersion = await LocalStorage.GetItemAsync<string>(cacheKey).ConfigureAwait(false);
        if (currentVersion == cacheVersion)
          return true;
      }

      LocalStorage.SetItemAsync(cacheKey, currentVersion).ConfigureAwait(false);
      return false;
    }
  }
}
