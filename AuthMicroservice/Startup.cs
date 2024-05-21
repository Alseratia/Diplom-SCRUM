
using AuthMicroservice.DataAccess;
using AuthMicroservice.Utils;
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
    services.AddAuthMicroserviceDatabaseContext(Configuration["AUTH_DB_CONNECTION_STRING"]!);
    services.AddDatabaseMigration();
    
    //UseCases
    services.AddScoped<UserService>();
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    app.UseHttpsRedirection();
    
    app.UseStaticFiles();
    
    app.UseSwagger();
    
    app.UseRouting();
    
    app.UseEndpoints(endpoints =>
    {
      endpoints.MapControllers();
    });
  }
}