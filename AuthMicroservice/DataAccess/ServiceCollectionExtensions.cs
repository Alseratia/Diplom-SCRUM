using Application.Repositories;
using AuthMicroservice.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AuthMicroservice.DataAccess;

public static class ServiceCollectionExtensions
{

  public static IServiceCollection AddPostgreSQLDataAccess(this IServiceCollection services, string connectionString)
  {
    services.AddAutoMapper(typeof(MapperProfile));
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<ITokenRepository, TokensRepository>();
    services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
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