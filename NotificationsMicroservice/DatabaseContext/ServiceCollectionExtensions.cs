using Microsoft.EntityFrameworkCore;

namespace NotificationsMicroservice.DatabaseContext;

public static class ServiceCollectionExtensions
{

  public static IServiceCollection AddNotificationsMicroserviceDatabaseContext(this IServiceCollection services, string connectionString)
  {
    services.AddDbContextFactory<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
    return services;
  }

  public static IServiceCollection AddDatabaseMigration(this IServiceCollection services)
  {
    var serviceProvider = services.BuildServiceProvider();

    using (var scope = serviceProvider.CreateScope())
    {
      var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
      dbContext.Database.Migrate();
    }
    return services;
  }
    
}