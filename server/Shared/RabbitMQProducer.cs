using System.Text;
using RabbitMQ.Client;

namespace Shared;

public class RabbitMQProducer : IDisposable
{
  private readonly IConnection _connection;
  private readonly IModel _model;
  private readonly string _queueName;
  
  public RabbitMQProducer()
  {
    var factory = new ConnectionFactory() { HostName = "rabbit-mq", 
      Port = 5672, UserName = "rabbit_user", Password = "rabbit_pass" };
  
    _connection = factory.CreateConnection();
    _model = _connection.CreateModel();
    _queueName = "Notifications";
    _model.QueueDeclare(queue: "Notifications", durable: false,
      exclusive: false, autoDelete: false, arguments: null);
  }

  public void Produce(string message)
  {
    var body = Encoding.UTF8.GetBytes(message);
    _model.BasicPublish(exchange: "",
      routingKey: _queueName,
      basicProperties: null,
      body: body);
  }

  public void Dispose()
  {
    _connection.Dispose();
    _model.Dispose();
  }
}