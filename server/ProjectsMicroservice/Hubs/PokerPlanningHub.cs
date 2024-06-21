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

  public async Task SendCurrentMark(string sprintId, string memberId, int mark)
  {
    await Clients.Groups(sprintId).SendAsync("MarkSended", memberId, mark);
  }

  public async Task SendFinalMark(string sprintId, Guid storyId, int mark)
  {
    using (var db = await _dbFactory.CreateDbContextAsync())
    {
      await db.UserStories.Where(x => x.Id == storyId)
        .ExecuteUpdateAsync(x => x.SetProperty(p => p.Mark, mark));
    }
    
  }
}