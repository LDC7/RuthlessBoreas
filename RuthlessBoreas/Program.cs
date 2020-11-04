namespace RuthlessBoreas
{
  using Blazored.LocalStorage;
  using Blazored.Modal;
  using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
  using Microsoft.Extensions.DependencyInjection;
  using RuthlessBoreas.Services;
  using System.Linq;
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

      foreach (var s in host.Services.GetServices<object>())
        System.Console.WriteLine(s.ToString());

      StorageService.LocalStorage = host.Services.GetServices<ILocalStorageService>().Single();
      DataLoader.Initialize((HttpClient)host.Services.GetService(typeof(HttpClient)));
      await DataLoader.LoadInitializeData();

      await host.RunAsync();
    }

    public static void ConfigureServices(IServiceCollection services)
    {
      services.AddSingleton(new HttpClient());
      services.AddBlazoredModal();
      services.AddBlazoredLocalStorage();
    }
  }
}
