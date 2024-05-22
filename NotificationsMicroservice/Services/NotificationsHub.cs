using Microsoft.AspNetCore.SignalR;

namespace NotificationsMicroservice.Services;


public class NotificationsHub : Hub
{
  public void Subscribe(string userId)
  {
    
  }
  
  public void Send(string userId, string message)
  {
    
  }
}