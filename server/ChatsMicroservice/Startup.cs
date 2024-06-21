using ChatsMicroservice.DatabaseContext;
using ChatsMicroservice.Hubs;
using Shared;

namespace  ChatsMicroservice;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    // services

    
    // database
    services.AddChatsMicroserviceDatabaseContext(Configuration["CHATS_DB_CONNECTION_STRING"]!);
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
      endpoints.MapHub<ChatsHub>("api/v1/chats-hub");
      endpoints.MapControllers();
    });
    
  }
}