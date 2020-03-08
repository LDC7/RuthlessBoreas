namespace RuthlessBoreas.Models
{
  using RuthlessBoreasDataContainer.Models;

  public class WowServer
  {
    public int Id { get; }
    public string Name { get; }
    public string RuName { get; }
    public string Title { get; }

    public WowServer(ServerData data)
    {
      this.Id = data.Id;
      this.Name = data.Name;
      this.RuName = data.RuName;
      this.Title = ToTitle(data.RuName);
    }

    private static string ToTitle(string name)
    {
      return char.ToUpper(name[0]) + name.Substring(1).Replace('-', ' ');
    }
  }
}
