using System.Text.Json.Serialization;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.Hubs;
using ProjectsMicroservice.Services;
using Shared;

namespace ProjectsMicroservice;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddSignalR();
    
    services.AddProjectsMicroserviceDatabaseContext(Configuration["PROJECTS_DB_CONNECTION_STRING"]!);
    services.AddDatabaseMigration();

    services.AddScoped<ProjectsService>()
      .AddScoped<TasksService>()
      .AddScoped<UserStoriesService>()
      .AddScoped<UserService>()
      .AddScoped<SprintsService>()
      .AddScoped<RabbitMQProducer>();

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
      x.MapHub<ProjectHub>("/api/v1/projects-hub");
      x.MapHub<PokerPlanningHub>("/api/v1/poker-planning-hub");
      x.MapControllers();
    });
  }
}