using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.DatabaseContext;

namespace ProjectsMicroservice.Middlewares;

public class RoleInProjectMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ApplicationDbContext _context;

    public RoleInProjectMiddleware(RequestDelegate next, ApplicationDbContext context)
    {
      _next = next;
      _context = context;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
      var routeValues = httpContext.Request.RouteValues;
      var userId = new Guid(httpContext.Request.Headers["userId"]!);
      var projectName = routeValues["projectName"]!.ToString();

      var member = _context.Members.Include(x => x.Project)
        .FirstOrDefault(x => x.UserId == userId && x.Project!.Name == projectName)!;

      var claims = new List<Claim>
      {
        new Claim("Role", member.Role.ToString())
      };
      var appIdentity = new ClaimsIdentity(claims);
      httpContext.User.AddIdentity(appIdentity);
        
      await _next(httpContext);
    }
  
}