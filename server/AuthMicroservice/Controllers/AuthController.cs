using AuthMicroservice.Controllers.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthMicroservice.Controllers;

[ApiController]
[Route("api/v1")]
public class AuthController : ControllerBase
{
  private readonly UserService _userService;
  public AuthController(UserService userService) => (_userService) = (userService);

  
  [HttpPost("register")]
  public async Task<ActionResult<LoginResponse>> Register([FromBody] RegisterRequest registerRequest)
  {
    return await _userService.Register(registerRequest.Email, registerRequest.Password, registerRequest.Name);
  }
  
  
  [HttpPost("login")]
  public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest loginRequest)
  {
    return await _userService.Login(loginRequest.Email, loginRequest.Password);
  }
  
  [HttpPost("refresh")]
  public async Task<ActionResult<LoginResponse>> Refresh([FromBody] RefreshRequest request)
  {
    return await _userService.RefreshTokens(request.AccessToken, request.RefreshToken);
  }
  
  [HttpGet("test")]
  public ActionResult TestEndpoint()
  {
    var claims = HttpContext;
    return Ok();
  }
}