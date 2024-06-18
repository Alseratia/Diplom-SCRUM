using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.DatabaseContext.Enums;
using ProjectsMicroservice.DatabaseContext.Models;

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

  // доска
  public async Task ChangeStory(string projectId, StoryResponse changedStory)
  {
    using (var db = await _dbFactory.CreateDbContextAsync())
    {
      await db.UserStories.Where(x => x.Id == changedStory.Id)
        .ExecuteUpdateAsync(setters =>
          setters.SetProperty(x => x.End, changedStory.End)
            .SetProperty(x => x.Start, changedStory.Start)
            .SetProperty(x => x.Title, changedStory.Title)
            .SetProperty(x => x.Text, changedStory.Text)
            .SetProperty(x => x.Priority, changedStory.Priority)
            .SetProperty(x => x.Mark, changedStory.Mark)
            .SetProperty(x => x.Status, changedStory.Status)
            .SetProperty(x => x.UserId, changedStory.UserId));
    }
    await Clients.Groups(projectId).SendAsync("ChangeStory", changedStory);
  }
  
  public async Task ChangeTask(string projectId, TaskResponse changedTask)
  {
    using (var db = await _dbFactory.CreateDbContextAsync())
    {
      await db.Tasks.Where(x => x.Id == changedTask.Id)
        .ExecuteUpdateAsync(setters =>
          setters.SetProperty(x => x.Title, changedTask.Title)
            .SetProperty(x => x.Text, changedTask.Text)
            .SetProperty(x => x.IsDone, changedTask.IsDone));
    }
    await Clients.Groups(projectId).SendAsync("ChangeTask", changedTask);
  }
  
}