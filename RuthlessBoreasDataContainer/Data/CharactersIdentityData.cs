namespace RuthlessBoreasDataContainer.Data
{
  using RuthlessBoreasDataContainer.Models;
  using System.Collections.Generic;
  using System.Threading.Tasks;

  public static class CharactersIdentityData
  {
    public static async Task<IEnumerable<CharacterIdentity>> Get()
    {
      return await Task.Run(() => new CharacterIdentity[]
      {
        new CharacterIdentity()
        {
          Id = 1,
          Name = "Менелос",
          Realm = 1,
          Region = "eu",
          Main = 1
        },
        new CharacterIdentity()
        {
          Id = 2,
          Name = "Айронделль",
          Realm = 1,
          Region = "eu",
          Main = 2
        },
        new CharacterIdentity(){
          Id = 3,
          Name = "Антоэн",
          Realm = 1,
          Region = "eu",
          Main = 3
        },
        new CharacterIdentity(){
          Id = 4,
          Name = "Данамеби",
          Realm = 1,
          Region = "eu",
          Main = 16
        },
        new CharacterIdentity(){
          Id = 5,
          Name = "Мадейв",
          Realm = 1,
          Region = "eu",
          Main = 5
        },
        new CharacterIdentity(){
          Id = 6,
          Name = "Манатель",
          Realm = 1,
          Region = "eu",
          Main = 6
        },
        new CharacterIdentity(){
          Id = 7,
          Name = "Мозгоёлка",
          Realm = 2,
          Region = "eu",
          Main = 7
        },
        new CharacterIdentity(){
          Id = 8,
          Name = "Невека",
          Realm = 3,
          Region = "eu",
          Main = 8
        },
        new CharacterIdentity(){
          Id = 9,
          Name = "Раллин",
          Realm = 1,
          Region = "eu",
          Main = 9
        },
        new CharacterIdentity(){
          Id = 10,
          Name = "Сетарра",
          Realm = 4,
          Region = "eu",
          Main = 10
        },
        new CharacterIdentity(){
          Id = 11,
          Name = "Хейрих",
          Realm = 1,
          Region = "eu",
          Main = 8
        },
        new CharacterIdentity(){
          Id = 12,
          Name = "Элайана",
          Realm = 1,
          Region = "eu",
          Main = 10
        },
        new CharacterIdentity(){
          Id = 13,
          Name = "Юнэса",
          Realm = 4,
          Region = "eu",
          Main = 13
        },
        new CharacterIdentity(){
          Id = 14,
          Name = "Ярослава",
          Realm = 1,
          Region = "eu",
          Main = 14
        },
        new CharacterIdentity(){
          Id = 15,
          Name = "Аллэргия",
          Realm = 5,
          Region = "eu",
          Main = 10
        },
        new CharacterIdentity(){
          Id = 16,
          Name = "Зирель",
          Realm = 1,
          Region = "eu",
          Main = 16
        },
        new CharacterIdentity(){
          Id = 17,
          Name = "Айнреттель",
          Realm = 1,
          Region = "eu",
          Main = 17
        }
      });
    }
  }
}