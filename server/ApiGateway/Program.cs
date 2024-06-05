using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace ApiGateway;

public static class Program
{
  public static void Main(string[] args)
  {
    var app = CreateHostBuilder(args).Build();
    app.Run();
  }

  private static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
      .ConfigureAppConfiguration((_, config) =>
      {
        config.AddJsonFile("ocelot.global.json")
              .AddJsonFile("ocelot.routes.json")
              .AddJsonFile("ocelot.swagger-endpoints.json");
        Console.WriteLine();
      })
      .ConfigureWebHostDefaults(webBuilder =>
      {
        webBuilder.UseStartup<Startup>();
      });
}
