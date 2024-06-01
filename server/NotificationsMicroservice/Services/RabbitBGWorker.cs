using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using NotificationsMicroservice.DatabaseContext;
using NotificationsMicroservice.DatabaseContext.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Shared;

namespace NotificationsMicroservice.Services;

public class RabbitBGWorker : BackgroundService
{
  private readonly IDbContextFactory<ApplicationDbContext> _dbFactory;
  private readonly IConnection _connection;
  private readonly IModel _channel;

  public RabbitBGWorker(IDbContextFactory<ApplicationDbContext> dbFactory)
  {
    _dbFactory = dbFactory;
    var factory = new ConnectionFactory() 
    { 
      HostName = "localhost", 
      Port = 5672, 
      UserName = "rabbit_user", 
      Password = "rabbit_pass"
    };
    
    _connection = factory.CreateConnection();
    _channel = _connection.CreateModel();
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
    var notificationMessage = JsonSerializer.Deserialize<NotificationModel>(message);
    if (notificationMessage == null)
    {
      // лог
      return;
    }
    
    var dbNotification = new Notification()
    {
      Id = Guid.NewGuid(),
      UserId = Guid.Parse(notificationMessage.UserId),
      Message = notificationMessage.Message,
      IsRead = false,
      CreatedAt = DateTime.Now
    };

    // TODO Отправить уведомление на сокет
    
    using (var db = _dbFactory.CreateDbContext())
    {
      db.Notifications.Add(dbNotification);
      db.SaveChanges();
    }
  }
}