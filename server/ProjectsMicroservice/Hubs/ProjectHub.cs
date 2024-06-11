using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Hubs;

public class ProjectHub : Hub
{
  private readonly IDbContextFactory<ApplicationDbContext> _dbFactory;
  
  public ProjectHub(IDbContextFactory<ApplicationDbContext> dbFactory)
    => _dbFactory = dbFactory;

  public async Task JoinProjectChannel(string projectId)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, projectId);
  }

  public async Task ChangeStoryStatus(string projectId, Guid storyId, StoryStatus newStatus)
  {
    await using var db = await _dbFactory.CreateDbContextAsync();
    var story = db.UserStories.Find(storyId);
      
    story.Status = newStatus;
    await db.SaveChangesAsync();

    var newStoryStatus = new
    {
      StoryId = storyId,
      NewStatus = newStatus
    };

    Clients.Group(projectId).SendAsync("NewStoryStatus", newStoryStatus);
  }
}