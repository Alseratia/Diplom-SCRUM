namespace AuthMicroservice;

public class Startup
{
  public Startup(IConfiguration configuration) => Configuration = configuration;
  
  private IConfiguration Configuration { get; }
  
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddControllers();

    // register swagger
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    app.UseSwagger();
    if (env.IsDevelopment()) app.UseSwaggerUI();

    //app.UseMiddleware<ErrorHandlingMiddleware>();

    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
      endpoints.MapControllers();
    });
  }
}