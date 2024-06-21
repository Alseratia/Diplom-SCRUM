using System.Text.Json;
using ChatsMicroservice.DatabaseContext;
using ChatsMicroservice.DatabaseContext.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatsMicroservice.Hubs;

public class ChatsHub : Hub
{
  private readonly IDbContextFactory<ApplicationDbContext> _dbFactory;

  public ChatsHub(IDbContextFactory<ApplicationDbContext> dbFactory)
    => _dbFactory = dbFactory;
  
  public async Task JoinChatChannel(Guid chatId)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
  }

  public async Task SendMessage(Guid chatId, Guid userId, string text)
  {
    var message = new Message()
    {
      Id = Guid.NewGuid(),
      CreatedAt = DateTime.Now,
      UserId = userId,
      ChatId = chatId,
      Text = text
    };
    using (var db = await _dbFactory.CreateDbContextAsync())
    {
      db.Messages.Add(message);
      await db.SaveChangesAsync();
    }

    await Clients.Groups(chatId.ToString()).SendAsync("NewMessage", message);
  }
}