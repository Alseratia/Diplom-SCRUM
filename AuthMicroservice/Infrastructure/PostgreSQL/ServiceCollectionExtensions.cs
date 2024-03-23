using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace AuthMicroservice.Infrastructure.PostgreSQL;

public static class ServiceCollectionExtensions
{

  public static IServiceCollection AddDatabaseContext(this IServiceCollection services, string connectionString)
  {
    var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
    
    services.AddDbContextFactory<ApplicationDbContext>(options => options.UseNpgsql(dataSourceBuilder.Build())
      .UseSnakeCaseNamingConvention());
    
    return services;
  }
}