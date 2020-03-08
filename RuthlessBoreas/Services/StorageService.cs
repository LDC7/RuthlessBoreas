namespace RuthlessBoreas.Services
{
  using RuthlessBoreas.Models;
  using System;
  using System.Collections.Generic;
  using System.Linq;

  public static class StorageService
  {
    private static Action charactersSubscribtions;

    private static IEnumerable<Character> characters;

    public static IEnumerable<Character> Characters
    {
      get => characters;
      set
      {
        characters = value;
        charactersSubscribtions?.Invoke();
      }
    }

    public static IEnumerable<WowServer> Servers { get; private set; }

    public static void SetServers(IEnumerable<WowServer> servers)
    {
      Servers = servers;
    }

    public static Character GetCharacter(int id)
    {
      return Characters.FirstOrDefault(character => character.Id == id);
    }

    public static void SubscribeOnSortedCharacterIdsChange(Action handler)
    {
      charactersSubscribtions += handler;
    }
    public static void UnsubscribeOnSortedCharacterIdsChange(Action handler)
    {
      charactersSubscribtions -= handler;
    }
  }
}
