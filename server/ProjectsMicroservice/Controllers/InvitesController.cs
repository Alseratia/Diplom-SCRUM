using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.DatabaseContext;

namespace ProjectsMicroservice.Controllers;

[Route("api/v1/projects/{projectName}/invites")]
[ApiController]
public class InvitesController : ControllerBase
{
  private readonly ApplicationDbContext _db;

  public InvitesController(ApplicationDbContext db)
    => (_db) = (db);
  
  [HttpGet]
  public ActionResult GetProjectInvites([FromHeader] Guid userId, string projectName)
  {
    _db.Users.Where(x => x.Id == userId)
      .SelectMany(x => x.Members!.Select(m => m.Project))
      .Where(x => x.Name == projectName)
      ;
    return Ok();
  }
  
  [HttpPost]
  public ActionResult CreateProjectInvite([FromHeader] Guid userId, string projectName, 
    [FromBody] CreateInviteRequest request)
  {
    return Ok();
  }
  
  // [HttpGet("invites/{inviteId}")]
  // public ActionResult AcceptUserInvite(string inviteId)
  // {
  //   return Ok();
  // }
  
  [HttpDelete("{inviteId}")]
  public IActionResult RevokeProjectInvite([FromHeader] Guid userId, string projectName, Guid inviteId)
  {
    return Ok();
  }
}