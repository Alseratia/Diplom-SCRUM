using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.DatabaseContext;

namespace ProjectsMicroservice.Hubs;

public class PokerPlanningHub : Hub
{
  private readonly IDbContextFactory<ApplicationDbContext> _dbFactory;
  
  public PokerPlanningHub(IDbContextFactory<ApplicationDbContext> dbFactory)
    => _dbFactory = dbFactory;
  
  public async Task JoinPokerPlanningChannel(string sprintId, string memberId, string name, string? avatar)
  {
    await Clients.Groups(sprintId).SendAsync("MemberJoined", memberId, name, avatar);
    await Groups.AddToGroupAsync(Context.ConnectionId, sprintId);
  }
}