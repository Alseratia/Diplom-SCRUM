using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotificationsMicroservice.DatabaseContext;
using NotificationsMicroservice.DatabaseContext.Models;

namespace NotificationsMicroservice.Controllers;

[ApiController]
[Route("/api/v1/notifications")]
public class NotificationsController : ControllerBase
{
  private readonly ApplicationDbContext _db;
  
  public NotificationsController(ApplicationDbContext db) => _db = db;
  
  [HttpGet]
  public async Task<ActionResult<ICollection<Notification>>> GetNotifications([FromHeader] Guid userId)
  {
    var notifications = await _db.Notifications.Where(x => x.UserId == userId).ToListAsync();

    return new OkObjectResult(notifications);
  }

  [HttpDelete]
  public async Task<ActionResult> DeleteNotifications([FromHeader] Guid userId)
  {
    await _db.Notifications.Where(x => x.UserId == userId).ExecuteDeleteAsync();
    return Ok();
  }
  
  [HttpDelete("{notificationId:guid}")]
  public async Task<ActionResult> DeleteNotification([FromHeader] Guid userId, Guid notificationId)
  {
    await _db.Notifications.Where(x => x.Id == notificationId && x.UserId == userId).ExecuteDeleteAsync();
    return Ok();
  }
}