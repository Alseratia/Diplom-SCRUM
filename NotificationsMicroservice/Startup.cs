using NotificationsMicroservice.DatabaseContext;
using NotificationsMicroservice.Services;

namespace NotificationsMicroservice;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddSignalR();
    services.AddHostedService<RabbitBGWorker>();
    services.AddNotificationsMicroserviceDatabaseContext(Configuration["NOTIFICATIONS_DB_CONNECTION_STRING"]!);

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
      endpoints.MapHub<NotificationsHub>("/api/v1/notifications");
    });
    
  }
}