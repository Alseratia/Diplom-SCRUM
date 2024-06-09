using NotificationsMicroservice.DatabaseContext;
using NotificationsMicroservice.Hubs;
using NotificationsMicroservice.Services;
using Shared;

namespace NotificationsMicroservice;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    // services
    services.AddHostedService<NotificationsBGWorker>();
    services.AddSingleton<NotificationsService>()
      .AddSingleton<RabbitMQConsumer>();
    
    // database
    services.AddNotificationsMicroserviceDatabaseContext(Configuration["NOTIFICATIONS_DB_CONNECTION_STRING"]!);
    services.AddDatabaseMigration();
    
    // endpoints
    services.AddControllers();
    services.AddSignalR();
    services.AddLogging();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    app.UseSwagger();
    app.UseSwaggerUI();
    
    app.UseRouting();
    
    app.UseEndpoints(endpoints =>
    {
      endpoints.MapHub<NotificationsHub>("api/v1/notifications-hub");
      endpoints.MapControllers();
    });
    
  }
}