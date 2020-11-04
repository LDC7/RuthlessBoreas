namespace RuthlessBoreas.Services
{
  using RuthlessBoreas.Models;
  using System;
  using System.Collections.Generic;
  using System.Linq;

  public static class StorageService
  {
    private static Action sortedCharacterIdsSubscribtions;

    private static IEnumerable<int> sortedCharacterIds;

    public static IEnumerable<int> SortedCharacterIds
    {
      get => FilterCharacters(sortedCharacterIds);
      set
      {
        sortedCharacterIds = value;
        sortedCharacterIdsSubscribtions?.Invoke();
      }
    }

    private static readonly ICollection<Character> characters = new List<Character>();

    public static IEnumerable<Character> Characters => characters;

    public static IEnumerable<WowServer> Servers { get; private set; }

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

    private static IEnumerable<int> FilterCharacters(IEnumerable<int> ids)
    {
      return ids.Select(id => GetCharacter(id))
        .Where(character => character.RaiderIo == null || character.RaiderIo.ScoreAll > 0 || !character.RaiderIo.RaidProgress.StartsWith("0"))
        .Select(character => character.Id)
        .ToArray();
    }
  }
}
