using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.DatabaseContext.Models;

namespace ProjectsMicroservice.Services;

public class TasksService
{
  private readonly ApplicationDbContext _db;

  public TasksService(ApplicationDbContext db)
    => _db = db;

  public async Task<ActionResult> CreateTask(Guid userStoryId, CreateStoryTaskRequest request)
  {
    var story = await _db.UserStories.FindAsync(userStoryId);
    if (story == null) return new NotFoundResult();

    var task = new StoryTask()
    {
      Id = Guid.NewGuid(),
      Title = request.Title,
      Text = request.Text,
      IsDone = false,
      UserStoryId = userStoryId
    };
    _db.Tasks.Add(task);
    await _db.SaveChangesAsync();
    
    return new OkResult();
  }

  public async Task<ActionResult> DeleteTask(Guid taskId)
  {
   var result = await _db.Tasks.Where(x => x.Id == taskId).ExecuteDeleteAsync();
   if (result == 0) return new NotFoundResult(); 
   return new OkResult();
  }
}