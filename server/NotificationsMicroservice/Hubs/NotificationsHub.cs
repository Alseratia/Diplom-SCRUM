﻿using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NotificationsMicroservice.DatabaseContext;
using NotificationsMicroservice.DatabaseContext.Models;

namespace NotificationsMicroservice.Hubs;

public class NotificationsHub : Hub
{
  private readonly IDbContextFactory<ApplicationDbContext> _dbFactory;

  public NotificationsHub(IDbContextFactory<ApplicationDbContext> dbFactory)
    => _dbFactory = dbFactory;

  public async Task JoinNotificationsChannel(string userId)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, userId);
  }

  public async Task ReadNotifications(string userId)
  {
    await using var db = await _dbFactory.CreateDbContextAsync();
    var userIdGuid = Guid.Parse(userId);
    await db.Notifications
      .Where(x => x.UserId == userIdGuid && x.ReadAt == null)
      .ExecuteUpdateAsync(x =>
        x.SetProperty(property => property.ReadAt, value => DateTime.Now)
      );
  }
}