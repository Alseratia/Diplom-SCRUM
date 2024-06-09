using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Shared;

public class RabbitMQConsumer : IDisposable
{
  private readonly IConnection _connection;
  private readonly IModel _model;
  public event EventHandler<BasicDeliverEventArgs>? Received;
  
  public RabbitMQConsumer()
  {
    var factory = new ConnectionFactory() { HostName = "rabbit-mq", 
      Port = 5672, UserName = "rabbit_user", Password = "rabbit_pass" };
    
    _connection = factory.CreateConnection();
    _model = _connection.CreateModel();
    _model.QueueDeclare(queue: "Notifications", durable: false,
      exclusive: false, autoDelete: false, arguments: null);
    
    var consumer = new EventingBasicConsumer(_model);
    consumer.Received += (model, ea) =>
    {
      Received?.Invoke(this, ea);
    };

    _model.BasicConsume(queue: "Notifications",
      autoAck: true,
      consumer: consumer);
  }

  public void Dispose()
  {
    _connection.Dispose();
    _model.Dispose();
  }
}

