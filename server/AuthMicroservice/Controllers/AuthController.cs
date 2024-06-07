using AuthMicroservice.Controllers.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthMicroservice.Controllers;

[ApiController]
[Route("api/v1/auth/")]
public class AuthController : ControllerBase
{
  private readonly UserService _userService;
  public AuthController(UserService userService) => (_userService) = (userService);

  
  [HttpPost("register")]
  public async Task<ActionResult<LoginResponse>> Register([FromBody] LoginRequest registerRequest)
  {
    return await _userService.Register(registerRequest.Email, registerRequest.Password);
  }
  
  
  [HttpPost("login")]
  public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest loginRequest)
  {
    return await _userService.Login(loginRequest.Email, loginRequest.Password);
  }
  
  [HttpPost("refresh")]
  public async Task<ActionResult<RefreshResponse>> Refresh([FromBody] RefreshRequest request)
  {
    return await _userService.RefreshTokens(request.AccessToken, request.RefreshToken);
  }

  [HttpGet("test2")]
  public async Task<ActionResult> Test2Endpoint()
  {
    await Task.Run(() => Console.WriteLine(123));
    return Ok();
  }
  
  [HttpGet("test")]
  public ActionResult TestEndpoint()
  {
    var claims = HttpContext;
    return Ok();
  }
}