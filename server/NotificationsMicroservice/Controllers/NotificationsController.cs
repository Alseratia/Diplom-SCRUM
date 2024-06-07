using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotificationsMicroservice.DatabaseContext;

namespace NotificationsMicroservice.Controllers;

[ApiController]
[Route("/api/v1")]
public class NotificationsController : ControllerBase
{
  private readonly ApplicationDbContext _db;
  
  public NotificationsController(ApplicationDbContext db) => _db = db;
  
  [HttpGet("user/{userId}/notifications")]
  public async Task<ActionResult> GetNotifications([FromRoute] Guid userId, [FromHeader(Name = "UserId")] Guid userIdFromHeader)
  {
    if (userId != userIdFromHeader) return new ForbidResult();
    
    var notifications = await _db.Notifications.Where(x => x.UserId == userId).ToListAsync();

    return new OkObjectResult(notifications);
  }
  
}