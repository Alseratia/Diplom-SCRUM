using Application;
using AuthMicroservice.DataAccess;

namespace AuthMicroservice.Web;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    services.AddPostgreSQLDataAccess(Configuration["AUTH_DB_CONNECTION_STRING"]!);
    services.AddDatabaseMigration();

    services.AddApplicationLayer();
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    app.UseSwagger();
    if (env.IsDevelopment()) app.UseSwaggerUI();

    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
      endpoints.MapControllers();
    });
  }
}