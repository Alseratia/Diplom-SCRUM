namespace ChatsMicroservice.Services;

public interface IMassageProducer
{
  void SendMessage(string message);
}