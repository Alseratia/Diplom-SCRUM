using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.DatabaseContext;

namespace ProjectsMicroservice.Controllers;

[Route("api/v1/projects/{projectName}/members")]
[ApiController]
public class MembersController : ControllerBase
{
  private readonly ApplicationDbContext _db;
  public MembersController(ApplicationDbContext db)
    => _db = db;
  
  [HttpGet]
  public ActionResult<ICollection<MembersResponse>> GetProjectMembers([FromHeader] Guid userId, string projectName)
  {
    var project = _db.Users
      .Where(x => x.Id == userId)
      .SelectMany(x => x.Members)
      .Select(x => x.Project)
      .FirstOrDefault(x => x.Name == projectName);
    
    var members = _db.Members.Include(x => x.User)
      .Where(x => x.ProjectId == project!.Id);

    return Ok(members.Select(x => new MembersResponse()
    {
      Id = x.Id,
      Role = x.Role,
      Avatar = x.User.Avatar,
      Name = x.User.Name
    }));
  }
  
  [HttpDelete("{memberId}")]
  public async Task<ActionResult> DeleteProjectMember([FromHeader] Guid userId, string projectName, Guid memberId)
  {
    var result = await _db.Members.Where(x => x.Id == memberId).ExecuteDeleteAsync();
    if (result == 0) return NotFound();
    return Ok();
  }
  
}