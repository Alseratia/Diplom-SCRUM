using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NotificationsMicroservice.DatabaseContext;
using NotificationsMicroservice.DatabaseContext.Models;
using NotificationsMicroservice.Hubs;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Shared;

namespace NotificationsMicroservice.Services;

public class RabbitBGWorker : BackgroundService
{
  private readonly IDbContextFactory<ApplicationDbContext> _dbFactory;
  private readonly IModel _channel;
  private readonly ILogger<RabbitBGWorker> _logger;
  private readonly IHubContext<NotificationsHub> _notificationsHub;
  public RabbitBGWorker(IDbContextFactory<ApplicationDbContext> dbFactory, 
    ILogger<RabbitBGWorker> logger, 
    IHubContext<NotificationsHub> notificationsHub)
  {
    _dbFactory = dbFactory;
    _logger = logger;
    _notificationsHub = notificationsHub;
    var factory = new ConnectionFactory() 
    { 
      HostName = "rabbit-mq", 
      Port = 5672, 
      UserName = "rabbit_user", 
      Password = "rabbit_pass"
    };
    
    _channel = factory.CreateConnection().CreateModel();
    _channel.QueueDeclare(queue: "Notifications",
      durable: false,
      exclusive: false,
      autoDelete: false,
      arguments: null);
  }
  
  protected override Task ExecuteAsync(CancellationToken stoppingToken)
  {
    var consumer = new EventingBasicConsumer(_channel);
    consumer.Received += Consume;
    
    _channel.BasicConsume(queue: "Notifications",
      autoAck: true,
      consumer: consumer);
    
    return Task.CompletedTask;
  }

  /// <summary>
  /// Добавляет уведомление в базу данных и отсылает его подписанным на это уведомление пользователям
  /// </summary>
  private void Consume(object? sen, BasicDeliverEventArgs eventArgs)
  {
    var message = Encoding.UTF8.GetString(eventArgs.Body.ToArray());
    NotificationModel notificationMessage = null!;
    try
    {
      notificationMessage = JsonSerializer.Deserialize<NotificationModel>(message)!;
    }
    catch (Exception e)
    {
      _logger.LogError("Ошибка десериализации уведомления из очереди");
    }
    
    var dbNotification = new Notification()
    {
      Id = Guid.NewGuid(),
      UserId = Guid.Parse(notificationMessage.UserId),
      Title = notificationMessage.Title,
      Message = notificationMessage.Message,
      IsRead = false,
      CreatedAt = DateTime.Now
    };
    
    _notificationsHub.Clients.Group(notificationMessage.UserId).SendAsync("Notification", dbNotification);
    
    using (var db = _dbFactory.CreateDbContext())
    {
      db.Notifications.Add(dbNotification);
      db.SaveChanges();
    }
  }
}