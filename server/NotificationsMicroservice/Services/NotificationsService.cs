using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NotificationsMicroservice.DatabaseContext;
using NotificationsMicroservice.DatabaseContext.Models;
using NotificationsMicroservice.Hubs;
using RabbitMQ.Client.Events;
using Shared;

namespace NotificationsMicroservice.Services;

public class NotificationsService
{
  private readonly ILogger<NotificationsService> _logger;
  private readonly IHubContext<NotificationsHub> _notificationsHub;
  private readonly IDbContextFactory<ApplicationDbContext> _dbFactory;
  
  public NotificationsService(IDbContextFactory<ApplicationDbContext> dbFactory,
    IHubContext<NotificationsHub> notificationsHub, ILogger<NotificationsService> logger)
  {
    _dbFactory = dbFactory;
    _logger = logger;
    _notificationsHub = notificationsHub;
  }
  
  public void ProcessNotification(BasicDeliverEventArgs eventArgs)
  {
    var notificationMessage = GetNotification(eventArgs);
    if (notificationMessage == null) return;
    
    var dbNotification = new Notification()
    {
      Id = Guid.NewGuid(),
      UserId = Guid.Parse(notificationMessage.UserId),
      Title = notificationMessage.Title,
      Message = notificationMessage.Message,
      CreatedAt = DateTime.Now
    };

    SaveNotificationToDb(dbNotification);
    SendNotificationToHub(dbNotification);
  }

  private NotificationModel? GetNotification(BasicDeliverEventArgs eventArgs)
  {
    var message = Encoding.UTF8.GetString(eventArgs.Body.ToArray());
    try
    {
      var notificationMessage = JsonSerializer.Deserialize<NotificationModel>(message)!;
      return notificationMessage;
    }
    catch (Exception e)
    {
      _logger.LogError("Ошибка десериализации уведомления из очереди");
    }

    return null;
  }

  private void SaveNotificationToDb(Notification notification)
  {
    using (var db = _dbFactory.CreateDbContext())
    {
      db.Notifications.Add(notification);
      db.SaveChanges();
    }
  }

  private void SendNotificationToHub(Notification notification)
  {
    _notificationsHub.Clients.Group(notification.UserId.ToString())
      .SendAsync("NewNotification", notification);
  }
}