
using AuthMicroservice.DataAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AuthMicroservice;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    // DatabaseContext
    var stringCon = Configuration["AUTH_DB_CONNECTION_STRING"]!;
    services.AddAuthMicroserviceDatabaseContext(Configuration["AUTH_DB_CONNECTION_STRING"]!);
    services.AddDatabaseMigration();
    
    //UseCases
    services.AddScoped<UseCases>();
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    if (env.IsDevelopment())
    {
      app.UseSwagger();
      app.UseSwaggerUI();
    }

    app.UseRouting();
    app.UseStaticFiles();
    
    app.UseEndpoints(endpoints =>
    {
      endpoints.MapControllers();
    });
  }
}