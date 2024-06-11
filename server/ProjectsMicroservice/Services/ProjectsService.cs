using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.DatabaseContext.Enums;
using ProjectsMicroservice.DatabaseContext.Models;

namespace ProjectsMicroservice.Services;

public class ProjectsService
{
  private readonly ApplicationDbContext _db;

  public ProjectsService(ApplicationDbContext db)
    => _db = db;

  public async Task<ActionResult> CreateProject(Guid userId, CreateProjectRequest request)
  {
    var newProject = new Project()
    {
      Id = Guid.NewGuid(),
      Name = request.Name,
      Avatar = request.Avatar,
      CreatedAt = DateTime.Now,
      Members = new List<Member>()
      {
        new()
        {
          Id = Guid.NewGuid(),
          Role = Role.Owner,
          UserId = userId
        }
      }
    };
    _db.Projects.Add(newProject);
    await _db.SaveChangesAsync();
    return new OkResult();
  }

  public ActionResult<ICollection<UserProjectResponse>> GetAllUserProjects(Guid userId)
  {
    var projects = _db.Members.AsNoTracking()
      .Include(x => x.Project)
      .Where(x => x.UserId == userId);
    
    var response = projects.Select(x => new UserProjectResponse()
    {
      Id = x.Project!.Id,
      Name = x.Project.Name,
      Avatar = x.Project.Avatar,
      Role = x.Role,
      CreatedAt = x.Project.CreatedAt,
      ClosedAt = x.Project.ClosedAt
    });
    return new OkObjectResult(response);
  }

  public async Task<ActionResult> DeleteProject(Guid userId, string projectName)
  {
    return new OkResult();
  }
}