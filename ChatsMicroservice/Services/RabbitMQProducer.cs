using System.Text;
using RabbitMQ.Client;

namespace ChatsMicroservice.Services;

public class RabbitMQProducer : IMassageProducer
{
  public void SendMessage(string message)
  {
    var factory = new ConnectionFactory() { HostName = "localhost" };
    using (var connection = factory.CreateConnection())
    using (var channel = connection.CreateModel())
    {
      channel.QueueDeclare(queue: "Notifications",
        durable: false,
        exclusive: false,
        autoDelete: false,
        arguments: null);

      var body = Encoding.UTF8.GetBytes(message);

      channel.BasicPublish(exchange: "",
        routingKey: "Notifications",
        basicProperties: null,
        body: body);
    }
  }
}