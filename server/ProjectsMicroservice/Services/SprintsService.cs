using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.DatabaseContext.Models;
using Shared;

namespace ProjectsMicroservice.Services;

public class SprintsService
{
  private readonly ApplicationDbContext _db;
  private readonly RabbitMQProducer _rabbitMQProducer;
  public SprintsService(ApplicationDbContext db, RabbitMQProducer rabbitMQProducer)
    => (_db, _rabbitMQProducer) = (db, rabbitMQProducer);

  public ActionResult<ICollection<SprintResponse>> GetProjectSprints(Guid userId, 
    string projectName)
  {
    var sprints = _db.Users.Where(x => x.Id == userId)
      .SelectMany(x => x.Members!.Select(m => m.Project))
      .Where(x => x.Name == projectName)
      .SelectMany(x => x.Sprints).ToList();

    return new OkObjectResult(sprints.Select(x => new SprintResponse()
    {
      Id = x.Id,
      Name = x.Name,
      Start = x.Start,
      End = x.End,
      CreatedAt = x.CreatedAt
    }).ToList());
  }

  public async Task<ActionResult<SprintResponse>> CreateProjectSprint(Guid userId, 
    string projectName, CreateSprintRequest request)
  {
    var project = _db.Users.Where(x => x.Id == userId)
      .SelectMany(x => x.Members!.Select(m => m.Project))
      .FirstOrDefault(x => x.Name == projectName);

    if (project == null) return new NotFoundResult();
    var newSprint = new Sprint()
    {
      Id = new Guid(),
      Name = request.Name,
      CreatedAt = DateTime.Now,
      ProjectId = project.Id
    };
    _db.Sprints.Add(newSprint);
    await _db.SaveChangesAsync();

    return new SprintResponse()
    {
      Id = newSprint.Id,
      Name = request.Name,
      CreatedAt = newSprint.CreatedAt
    };
  }

  public ActionResult DeleteProjectSprint()
  {
    return new OkResult();
  }

  public async Task<ActionResult> StartSprint(Guid userId,
    string projectName, string sprintName, StartSprintRequest request)
  {
    var sprint = _db.Users.Where(x => x.Id == userId)
      .SelectMany(x => x.Members!.Select(m => m.Project))
      .Where(x => x.Name == projectName)
      .SelectMany(x => x.Sprints)
      .FirstOrDefault(x => x.Name == sprintName);
    
    if (sprint == null) return new NotFoundResult();

    sprint.Start = request.Start;
    sprint.End = request.End;
    
    await _db.SaveChangesAsync();
    
    var members = _db.Projects
      .Include(p => p.Members)
      .Where(p => p.Id == sprint.ProjectId)
      .SelectMany(p => p.Members);
    
    foreach (var member in members)
    {
      _rabbitMQProducer.Produce(new NotificationModel()
        {
          Title = $"{projectName}",
          Message = $"Sprint `{sprint.Name}` is planned {sprint.Start} - {sprint.End}",
          UserId = member.UserId.ToString()
        });
    }
    return new OkResult();
  }
}