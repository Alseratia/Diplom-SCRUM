using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/")]
[ApiController]
public class UsersController : ControllerBase
{
  private readonly UserService _userService;

  public UsersController(UserService userService)
    => _userService = userService;
  
  [HttpPost("users")]
  public async Task<ActionResult> CreateUser([FromBody] CreateUserRequest requst)
  {
    return await  _userService.CreateUser(requst);
  }

  [HttpGet("users")]
  public async Task<ActionResult<UserResponse>> GetUserInfo([FromHeader] Guid userId)
  {
    return await _userService.GetUser(userId);
  }
}