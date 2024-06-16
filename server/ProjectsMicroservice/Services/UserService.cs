using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.DatabaseContext;
using ProjectsMicroservice.DatabaseContext.Models;

namespace ProjectsMicroservice.Services;

public class UserService
{
  private readonly ApplicationDbContext _db;

  public UserService(ApplicationDbContext db)
    => _db = db;

  public async Task<ActionResult> CreateUser(CreateUserRequest request)
  {
    _db.Users.Add(new User()
    {
      Id = request.UserId,
      Name = request.Name,
      Avatar = request.Avatar
    });
    await _db.SaveChangesAsync();
    return new OkResult();
  }

  public async Task<ActionResult<UserResponse>> GetUser(Guid userId)
  {
    var user = await _db.Users.FindAsync(userId);
    if (user == null) return new NotFoundResult();

    return new UserResponse()
    {
      UserId = user.Id.ToString(),
      Avatar = user.Avatar,
      Name = user.Name
    };
  }

  public async Task<ActionResult<ICollection<ProjectInviteResponse>>> GetInvites(Guid userId)
  {
    var invites = await _db.Invites.Where(x => x.User.Id == userId)
      .Include(x => x.Project).ToListAsync();
    
    return new OkObjectResult(invites.Select(x => new UserInviteResponse()
    {
      Id = x.Id,
      Role = x.Role,
      CreatedAt = x.CreatedAt,
      ProjectName = x.Project.Name,
      ProjectAvatar = x.Project.Avatar
    }));
  }

  public async Task<ActionResult> AcceptInvite(Guid userId, Guid inviteId)
  {
    var invite = await _db.Invites.FindAsync(inviteId);
    
    var newMember = new Member()
    {
      Id = Guid.NewGuid(),
      ProjectId = invite.ProjectId,
      UserId = invite.UserId,
      Role = invite.Role
    };
    
    _db.Invites.Remove(invite);
    _db.Members.Add(newMember);
    _db.SaveChanges();
    
    return new OkResult();
  }
  
  public async Task<ActionResult> RejectInvite(Guid userId, Guid inviteId)
  {
    var result = await _db.Invites.Where(x => x.Id == inviteId)
      .ExecuteDeleteAsync();

    if (result == 0) return new NotFoundResult();
    
    return new OkResult();
  }
}