using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.DatabaseContext.Enums;
using ProjectsMicroservice.DatabaseContext.Models;

namespace ProjectsMicroservice.Services;

public class UserStoriesService
{
  private readonly ApplicationDbContext _db;

  public UserStoriesService(ApplicationDbContext db)
    => _db = db;

  public ActionResult<ICollection<UserStoryResponse>> GetProjectUserStories(string projectName)
  {
    var dbStories = _db.UserStories.AsNoTracking()
        .Include(x => x.Project)
      .Where(x => x.Project!.Name == projectName)
      .Include(x => x.Tasks);
    
    var stories = dbStories.Select(x => MapStoryResponse(x));
    return new OkObjectResult(stories);
  }

  public ActionResult<ICollection<UserStoryResponse>> GetSprintUserStories(Guid sprintId)
  {
    var dbStories = _db.UserStories.AsNoTracking()
      .Where(x => x.SprintId == sprintId)
      .Include(x => x.Tasks);

    var stories = dbStories.Select(x => MapStoryResponse(x));
    return new OkObjectResult(stories);
  }

  public ActionResult<ICollection<UserStoryResponse>> GetUserUserStories(Guid userId)
  {
    var dbStories = _db.UserStories.AsNoTracking()
      .Where(x => x.UserId == userId)
      .Include(x => x.Tasks);
    
    var stories = dbStories.Select(x => MapStoryResponse(x));
    return new OkObjectResult(stories);
  }
  
  public async Task<ActionResult<UserStoryResponse>> CreateUserStory(Guid userId, string projectName, CreateUserStoryRequest request)
  {
    var project = _db.Users.Where(x => x.Id == userId)
      .Include(x => x.Members)
      .SelectMany(x => x.Members!.Select(m => m.Project))
      .FirstOrDefault(x => x.Name == projectName);
    
    if (project == null) return new NotFoundResult();

    var newStory = new UserStory()
    {
      Id = Guid.NewGuid(),
      Text = request.Text,
      Title = request.Title,
      ProjectId = project.Id,
      Tasks = new List<StoryTask>()
    };
    _db.UserStories.Add(newStory);
    await _db.SaveChangesAsync();
    
    return new OkObjectResult(MapStoryResponse(newStory));
  }

  public async Task<ActionResult> DeleteUserStory(string projectName, Guid storyId)
  {
    var result = await _db.UserStories
      .Where(x => x.Id == storyId)
      .ExecuteDeleteAsync();
    if (result == 0) return new NotFoundResult();
    
    return new OkResult();
  }

  public async Task<ActionResult> MoveStoryToSprint(Guid userStoryId, Guid sprintId)
  {
    var result = await _db.UserStories
      .Where(x => x.Id == userStoryId)
      .ExecuteUpdateAsync(x => 
        x.SetProperty(p => p.ProjectId, v => null)
        .SetProperty(p => p.SprintId, v => sprintId));

    if (result == 0) return new NotFoundResult();
    
    return new OkResult();
  }

  private static UserStoryResponse MapStoryResponse(UserStory story)
  {
    return new UserStoryResponse()
    {
      Id = story.Id,
      Title = story.Title,
      Text = story.Text,
      Priority = story.Priority,
      Mark = story.Mark,
      Status = story.Status,
      Start = story.Start,
      End = story.End,
      UserId = story.UserId,
      Tasks = story.Tasks.Select(t => new StoryTaskResponse()
      {
        Id = t.Id,
        Title = t.Title,
        Text = t.Text,
        IsDone = t.IsDone
      }).ToList()
    };
  }
}