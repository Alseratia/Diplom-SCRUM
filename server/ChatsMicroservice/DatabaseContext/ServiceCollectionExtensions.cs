using Microsoft.EntityFrameworkCore;

namespace ChatsMicroservice.DatabaseContext;

public static class ServiceCollectionExtensions
{

  public static IServiceCollection AddChatsMicroserviceDatabaseContext(this IServiceCollection services, string connectionString)
  {
    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    //services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
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