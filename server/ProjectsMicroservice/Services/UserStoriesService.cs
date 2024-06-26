﻿using Microsoft.AspNetCore.Mvc;
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

  public ActionResult<ICollection<StoryResponse>> GetProjectUserStories(Guid userId, string projectName)
  {
    var dbStories = _db.UserStories.AsNoTracking()
        .Include(x => x.Project)
      .Where(x => x.Project!.Name == projectName)
      .Include(x => x.Tasks);
    
    var stories = dbStories.Select(x => MapStoryResponse(x));
    return new OkObjectResult(stories);
  }

  public ActionResult<ICollection<StoryResponse>> GetSprintUserStories(Guid userId, string projectName, string sprintName)
  {
    var dbStories = _db.UserStories.AsNoTracking()
      .Where(x => x.Sprint!.Name == sprintName)
      .Include(x => x.Tasks);

    var stories = dbStories.Select(x => MapStoryResponse(x));
    return new OkObjectResult(stories);
  }

  public ActionResult<ICollection<StoryResponse>> GetUserUserStories(Guid userId)
  {
    var dbStories = _db.UserStories.AsNoTracking()
      .Where(x => x.UserId == userId)
      .Include(x => x.Tasks);
    
    var stories = dbStories.Select(x => MapStoryResponse(x));
    return new OkObjectResult(stories);
  }
  
  public async Task<ActionResult<StoryResponse>> CreateUserStory(Guid userId, string projectName, CreateUserStoryRequest request)
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
      Priority = request.Priority,
      Tasks = new List<StoryTask>()
    };
    _db.UserStories.Add(newStory);
    await _db.SaveChangesAsync();
    
    return new OkObjectResult(MapStoryResponse(newStory));
  }

  public async Task<ActionResult> DeleteUserStory(Guid userId, string projectName, Guid storyId)
  {
    var result = await _db.UserStories
      .Where(x => x.Id == storyId)
      .ExecuteDeleteAsync();
    if (result == 0) return new NotFoundResult();
    
    return new OkResult();
  }

  public async Task<ActionResult> MoveStoryToSprint(Guid userId, Guid storyId, string projectName, string sprintName)
  {
    var sprint = _db.Users.Where(x => x.Id == userId)
      .SelectMany(x => x.Members!.Select(m => m.Project))
      .Where(x => x.Name == projectName)
      .SelectMany(x => x.Sprints)
      .FirstOrDefault(x => x.Name == sprintName);
    
    if (sprint == null) return new NotFoundResult();
    
    var result = await _db.UserStories
      .Where(x => x.Id == storyId)
      .ExecuteUpdateAsync(x => 
        x.SetProperty(p => p.ProjectId, v => null)
        .SetProperty(p => p.SprintId, v => sprint.Id));

    if (result == 0) return new NotFoundResult();
    
    return new OkResult();
  }

  private static StoryResponse MapStoryResponse(UserStory story)
  {
    return new StoryResponse()
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
      Tasks = story.Tasks.Select(t => new TaskResponse()
      {
        Id = t.Id,
        Title = t.Title,
        Text = t.Text,
        IsDone = t.IsDone
      }).ToList()
    };
  }
}