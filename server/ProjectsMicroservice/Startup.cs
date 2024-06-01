using ProjectsMicroservice.DatabaseContext;

namespace ProjectsMicroservice;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddProjectsMicroserviceDatabaseContext(Configuration["PROJECTS_DB_CONNECTION_STRING"]!);
    services.AddDatabaseMigration();
    
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    app.UseSwagger();
    app.UseSwaggerUI();
    
    app.UseRouting();
    

    
  }
}