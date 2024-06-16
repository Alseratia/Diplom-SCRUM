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

  public async Task<ActionResult<UserProjectResponse>> CreateProject(Guid userId, CreateProjectRequest request)
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
    return new OkObjectResult(new UserProjectResponse()
    {
      Id = newProject.Id,
      Avatar = newProject.Avatar,
      CreatedAt = newProject.CreatedAt,
      Name = newProject.Name,
      Role = Role.Owner
    });
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

  public async Task<ActionResult<UserProjectResponse>> GetUserProject(Guid userId, string projectName)
  {
    var member = await _db.Members.AsNoTracking()
      .Include(x => x.Project)
      .FirstOrDefaultAsync(x => x.UserId == userId && x.Project.Name == projectName);
    if (member == null) return new NotFoundResult();
    
    var response = new UserProjectResponse()
    {
      Id = member.Project!.Id,
      Name = member.Project.Name,
      Avatar = member.Project.Avatar,
      Role = member.Role,
      CreatedAt = member.Project.CreatedAt,
      ClosedAt = member.Project.ClosedAt
    };
    return new OkObjectResult(response);
  }
  
  public async Task<ActionResult> DeleteProject(Guid userId, string projectName)
  {
    var result = await _db.Members
      .Where(x => x.UserId == userId && x.Project.Name == projectName)
      .Select(x => x.Project)
      .ExecuteDeleteAsync();
    
    if (result == 0) return new NotFoundResult();
    return new OkResult();
  }
}