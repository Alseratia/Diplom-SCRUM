using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.DatabaseContext.Models;
using Shared;

namespace ProjectsMicroservice.Controllers;

[Route("api/v1/projects/{projectName}/invites")]
[ApiController]
public class InvitesController : ControllerBase
{
  private readonly ApplicationDbContext _db;
  private readonly RabbitMQProducer _rabbitMQProducer;
  public InvitesController(ApplicationDbContext db, RabbitMQProducer rabbitMQProducer)
    => (_db, _rabbitMQProducer) = (db, rabbitMQProducer);
  
  [HttpGet]
  public ActionResult<ICollection<ProjectInviteResponse>> GetProjectInvites([FromHeader] Guid userId, string projectName)
  {
    var projectWithInvites = _db.Members
      .Where(x => x.UserId == userId && x.Project.Name == projectName)
      .Include(x => x.Project)
      .ThenInclude(x => x.Invites)
      .ThenInclude(x => x.User)
      .Select(x => x.Project)
      .Single();

    var response = projectWithInvites.Invites
      .Select(x => new ProjectInviteResponse()
      {
        Id = x.Id,
        Role = x.Role,
        CreatedAt = x.CreatedAt,
        UserName = x.User.Name,
        UserAvatar = x.User.Avatar
      });
    return Ok(response);
  }
  
  [HttpPost]
  public ActionResult CreateProjectInvite([FromHeader] Guid userId, string projectName, 
    [FromBody] CreateInviteRequest request)
  {
    var projectWithInvites = _db.Members
      .Where(x => x.UserId == userId && x.Project.Name == projectName)
      .Include(x => x.Project)
      .ThenInclude(x => x.Invites)
      .ThenInclude(x => x.User)
      .Select(x => x.Project)
      .Single();
    
    var user = _db.Users.FirstOrDefault(x => x.Name == request.UserName);
    
    _db.Invites.Add(new Invite()
    {
      CreatedAt = DateTime.Now,
      Id = Guid.NewGuid(),
      Role = request.UserRole,
      UserId = user.Id,
      ProjectId = projectWithInvites.Id
    });
    _db.SaveChanges();
    
    // уведомление
    _rabbitMQProducer.Produce(new NotificationModel()
    {
      Title = "Приглашение в проект",
      Message = $"Вас пригласили в проект {projectName}",
      UserId = user.Id.ToString()
    });
    
    return Ok();
  }
  
  
  [HttpDelete("{inviteId}")]
  public IActionResult RevokeProjectInvite([FromHeader] Guid userId, string projectName, 
    Guid inviteId)
  {
    _db.Invites.Where(x => x.Id == inviteId).ExecuteDelete();
    return Ok();
  }
}