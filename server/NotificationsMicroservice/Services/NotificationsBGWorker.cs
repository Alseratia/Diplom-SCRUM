
using Shared;

namespace NotificationsMicroservice.Services;

public class NotificationsBGWorker : BackgroundService
{
  private readonly NotificationsService _notificationService;
  private readonly RabbitMQConsumer _consumer;
  public NotificationsBGWorker(NotificationsService service, RabbitMQConsumer consumer)
  {
    _consumer = consumer;
    _notificationService = service;
    _consumer.Received += (sender, eventArgs) =>
    {
      _notificationService.ProcessNotification(eventArgs);
    };
  }
  
  protected override Task ExecuteAsync(CancellationToken stoppingToken)
  {
    return Task.CompletedTask;
  }
}