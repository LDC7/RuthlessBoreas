namespace RuthlessBoreasDataContainer.Data
{
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using RuthlessBoreasDataContainer.Models;

  public static class CharactersIdentityData
  {
    public static async Task<IEnumerable<CharacterIdentity>> Get()
    {
      return await Task.FromResult(new CharacterIdentity[]
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
          Realm = 4,
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
          Name = "Инралл",
          Realm = 4,
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
          Realm = 4,
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
        },
        new CharacterIdentity(){
          Id = 18,
          Name = "Орвента",
          Realm = 4,
          Region = "eu",
          Main = 1
        },
        new CharacterIdentity(){
          Id = 19,
          Name = "Деленэль",
          Realm = 4,
          Region = "eu",
          Main = 10
        },
        new CharacterIdentity(){
          Id = 20,
          Name = "Инотра",
          Realm = 4,
          Region = "eu",
          Main = 13
        },
        new CharacterIdentity(){
          Id = 21,
          Name = "Касирия",
          Realm = 4,
          Region = "eu",
          Main = 8
        },
        new CharacterIdentity(){
          Id = 22,
          Name = "Фэллсорд",
          Realm = 4,
          Region = "eu",
          Main = 8
        },
        new CharacterIdentity(){
          Id = 23,
          Name = "Ралус",
          Realm = 4,
          Region = "eu",
          Main = 8
        },
        new CharacterIdentity(){
          Id = 24,
          Name = "Невека",
          Realm = 4,
          Region = "eu",
          Main = 8
        },
        new CharacterIdentity(){
          Id = 25,
          Name = "Иотире",
          Realm = 4,
          Region = "eu",
          Main = 10
        },
        new CharacterIdentity(){
          Id = 26,
          Name = "Элаэйна",
          Realm = 4,
          Region = "eu",
          Main = 10
        },
        new CharacterIdentity(){
          Id = 27,
          Name = "Мальтейра",
          Realm = 4,
          Region = "eu",
          Main = 6
        },
        new CharacterIdentity(){
          Id = 28,
          Name = "Торрал",
          Realm = 4,
          Region = "eu",
          Main = 3
        },
        new CharacterIdentity(){
          Id = 29,
          Name = "Кранод",
          Realm = 4,
          Region = "eu",
          Main = 8
        },
        new CharacterIdentity(){
          Id = 30,
          Name = "Наали",
          Realm = 4,
          Region = "eu",
          Main = 17
        },
        new CharacterIdentity(){
          Id = 31,
          Name = "Внайт",
          Realm = 4,
          Region = "eu",
          Main = 31
        },
        new CharacterIdentity(){
          Id = 32,
          Name = "Сумонька",
          Realm = 4,
          Region = "eu",
          Main = 32
        },
        new CharacterIdentity(){
          Id = 33,
          Name = "Твилька",
          Realm = 4,
          Region = "eu",
          Main = 31
        },
        new CharacterIdentity(){
          Id = 34,
          Name = "Кельданат",
          Realm = 4,
          Region = "eu",
          Main = 34
        },
        new CharacterIdentity(){
          Id = 35,
          Name = "Бимори",
          Realm = 4,
          Region = "eu",
          Main = 35
        },
        new CharacterIdentity(){
          Id = 36,
          Name = "Линаико",
          Realm = 4,
          Region = "eu",
          Main = 36
        },
        new CharacterIdentity(){
          Id = 37,
          Name = "Торральд",
          Realm = 4,
          Region = "eu",
          Main = 37
        },
        new CharacterIdentity(){
          Id = 38,
          Name = "Тариа",
          Realm = 4,
          Region = "eu",
          Main = 38
        },
        new CharacterIdentity(){
          Id = 39,
          Name = "Мрачныймеч",
          Realm = 4,
          Region = "eu",
          Main = 39
        },
        new CharacterIdentity(){
          Id = 40,
          Name = "Агилок",
          Realm = 4,
          Region = "eu",
          Main = 40
        },
        new CharacterIdentity(){
          Id = 41,
          Name = "Рубируби",
          Realm = 4,
          Region = "eu",
          Main = 41
        },
        new CharacterIdentity(){
          Id = 42,
          Name = "Простодимка",
          Realm = 4,
          Region = "eu",
          Main = 42
        }
      });
    }
  }
}