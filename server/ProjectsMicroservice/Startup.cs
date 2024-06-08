using System.Text.Json.Serialization;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddProjectsMicroserviceDatabaseContext(Configuration["PROJECTS_DB_CONNECTION_STRING"]!);
    services.AddDatabaseMigration();

    services.AddScoped<ProjectsService>()
      .AddScoped<TasksService>()
      .AddScoped<UserStoriesService>()
      .AddScoped<UserService>();

    services.AddControllers().AddJsonOptions(x =>
    {
      x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    app.UseSwagger();
    app.UseSwaggerUI();
    
    app.UseRouting();

    app.UseEndpoints(x =>
    {
      x.MapControllers();
    });
  }
}