namespace RuthlessBoreas
{
  using Blazored.Modal;
  using Microsoft.AspNetCore.Blazor.Hosting;
  using Microsoft.Extensions.DependencyInjection;
  using RuthlessBoreas.Services;
  using System.Net.Http;
  using System.Threading.Tasks;

  public class Program
  {
    public static async Task Main(string[] args)
    {
      var builder = WebAssemblyHostBuilder.CreateDefault(args);

      builder.RootComponents.Add<App>("app");
      ConfigureServices(builder.Services);

      var host = builder.Build();

      DataLoader.Initialize((HttpClient)host.Services.GetService(typeof(HttpClient)));
      await DataLoader.LoadInitializeData();

      await host.RunAsync();
    }

    public static void ConfigureServices(IServiceCollection services)
    {
      services.AddBlazoredModal();
    }
  }
}
