namespace RuthlessBoreas.Models
{
  public class WowServer
  {
    public int Id { get; }
    public string Name { get; }
    public string RuName { get; }

    public WowServer(ServerData data)
    {
      this.Id = data.Id;
      this.Name = data.Name;
      this.RuName = data.RuName;
    }
  }
}
