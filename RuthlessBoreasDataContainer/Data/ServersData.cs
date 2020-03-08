namespace RuthlessBoreasDataContainer.Data
{
  using RuthlessBoreasDataContainer.Models;
  using System.Collections.Generic;
  using System.Threading.Tasks;

  public static class ServersData
  {
    public static async Task<IEnumerable<ServerData>> Get()
    {
      return await Task.Run(() => new ServerData[]
      {
        new ServerData()
        {
          Id = 1,
          Name = "borean-tundra",
          RuName = "бореиская-тундра"
        },
        new ServerData()
        {
          Id = 2,
          Name = "deepholm",
          RuName = "подземье"
        },
        new ServerData()
        {
          Id = 3,
          Name = "azuregos",
          RuName = "азурегос"
        },
        new ServerData()
        {
          Id = 4,
          Name = "gordunni",
          RuName = "гордунни"
        },
        new ServerData()
        {
          Id = 5,
          Name = "fordragon",
          RuName = "дракономор"
        }
      });
    }
  }
}
