using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class ServiceCollectionExtensions
{

  public static IServiceCollection AddApplicationLayer(this IServiceCollection services)
  {
    services.AddScoped<UseCases.UseCases>();
    return services;
  }


}