using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotificationsMicroservice.DatabaseContext;
using NotificationsMicroservice.DatabaseContext.Models;

namespace NotificationsMicroservice.Controllers;

[ApiController]
[Route("/api/v1/")]
public class NotificationsController : ControllerBase
{
  private readonly ApplicationDbContext _db;
  
  public NotificationsController(ApplicationDbContext db) => _db = db;
  
  [HttpGet("user/{userId}/notifications")]
  public async Task<ActionResult<ICollection<Notification>>> GetNotifications(Guid userId, 
    [FromHeader(Name = "UserId")] Guid userIdFromHeader)
  {
    if (userId != userIdFromHeader) return new ForbidResult();
    
    var notifications = await _db.Notifications.Where(x => x.UserId == userId).ToListAsync();

    return new OkObjectResult(notifications);
  }

  [HttpDelete("/users/{userId}/notifications")]
  public async Task<ActionResult> DeleteNotifications(Guid userId, 
    [FromHeader(Name = "UserId")] Guid userIdFromHeader)
  {
    if (userId != userIdFromHeader) return new ForbidResult();
    await _db.Notifications.Where(x => x.UserId == userId).ExecuteDeleteAsync();
    return Ok();
  }
  
  [HttpDelete("/users/{userId}/notifications/{notificationId}")]
  public async Task<ActionResult> DeleteNotification(Guid userId, Guid notificationId, 
    [FromHeader(Name = "UserId")] Guid userIdFromHeader)
  {
    if (userId != userIdFromHeader) return new ForbidResult();
    await _db.Notifications.Where(x => x.Id == notificationId && x.UserId == userId).ExecuteDeleteAsync();
    return Ok();
  }
}