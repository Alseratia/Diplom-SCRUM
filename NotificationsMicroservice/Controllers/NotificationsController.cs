using Microsoft.AspNetCore.Mvc;
using NotificationsMicroservice.DatabaseContext;

namespace NotificationsMicroservice.Controllers;

[ApiController]
public class NotificationsController : ControllerBase
{
  private readonly ApplicationDbContext _db;
  
  public NotificationsController(ApplicationDbContext db) => _db = db;
  
  public async Task<ActionResult> GetNotifications(string userId)
  {
    var userIdGuid = Guid.Parse(userId);
    var notifications = _db.Notifications.Where(x => x.UserId == userIdGuid).ToList();

    return new OkResult();
  }
}