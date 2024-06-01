using Microsoft.EntityFrameworkCore;

namespace ProjectsMicroservice.DatabaseContext;

public static class ServiceCollectionExtensions
{
  public static IServiceCollection AddProjectsMicroserviceDatabaseContext(this IServiceCollection services, string connectionString)
  {
    services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
    //services.AddDbContextFactory<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
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