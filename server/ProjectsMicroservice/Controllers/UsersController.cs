using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/users/")]
[ApiController]
public class UsersController : ControllerBase
{
  private readonly UserService _userService;

  public UsersController(UserService userService)
    => _userService = userService;
  
  [HttpPost]
  public async Task<ActionResult> CreateUser([FromBody] CreateUserRequest request)
  {
    return await  _userService.CreateUser(request);
  }

  [HttpGet]
  public async Task<ActionResult<UserResponse>> GetUserInfo([FromHeader] Guid userId)
  {
    return await _userService.GetUser(userId);
  }

  [HttpGet("invites")]
  public async Task<ActionResult<ICollection<ProjectInviteResponse>>> GetUserInvites([FromHeader] Guid userId)
  {
    return await _userService.GetInvites(userId);
  }
  
  [HttpPost("invites/{inviteId}")]
  public async Task<ActionResult> AcceptUserInvite([FromHeader] Guid userId, Guid inviteId)
  {
    return await _userService.AcceptInvite(userId, inviteId);
  }
  
  [HttpDelete("invites/{inviteId}")]
  public async Task<ActionResult> RejectUserInvite([FromHeader] Guid userId, Guid inviteId)
  {
    return await _userService.RejectInvite(userId, inviteId);
  }
}