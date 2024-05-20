using AuthMicroservice;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace ApiGateway;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddJwtAuthentication();
    services.AddOcelot(Configuration);

    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
    
    services.AddSwaggerForOcelot(Configuration);
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    if (env.IsDevelopment())
    {
      app.UseSwagger();
      app.UseSwaggerForOcelotUI();
    }

    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();
    
    app.UseOcelot().Wait();
    
    app.UseEndpoints(endpoints =>
    {
      endpoints.MapControllers();
    });
  }
}