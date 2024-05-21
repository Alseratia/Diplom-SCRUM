using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace ApiGateway;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    
    services.AddAuthentication(o =>
      {
        o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(o =>
      {
        o.RequireHttpsMetadata = false;
        o.SaveToken = true;
        o.TokenValidationParameters = new TokenValidationParameters()
        {
          ValidateIssuerSigningKey = true,
          ValidateIssuer = false,
          ValidateAudience = false,
          IssuerSigningKey = new SymmetricSecurityKey("12DD91672632AF1E01A5896DA559E8F7"u8.ToArray())
        };
      });
    
    services.AddOcelot(Configuration);

    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
    
    services.AddSwaggerForOcelot(Configuration);
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    app.UseHttpsRedirection();
    
    app.UseStaticFiles();

    app.UseSwagger();
    app.UseSwaggerForOcelotUI();
    
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