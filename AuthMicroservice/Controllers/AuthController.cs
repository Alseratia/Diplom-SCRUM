using AuthMicroservice.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AuthMicroservice.Controllers;

[ApiController]
[Route("api/v1")]
public class AuthController : ControllerBase
{
  private readonly UseCases _useCases;
  public AuthController(UseCases useCases) => _useCases = useCases;

  [HttpPost("register")]
  public async Task<ActionResult<CreateUserDto>> CreateUser([FromBody] RegisterRequest registerRequest)
  {
    return await _useCases.CreateUser(registerRequest.Email, registerRequest.Password, registerRequest.Name);
  }
  
  [HttpPost("login")]
  public async Task<ActionResult<NewTokensDto>> Login([FromBody] LoginRequest loginRequest)
  {
    return await _useCases.NewTokens(loginRequest.Email, loginRequest.Password);
  }
  
  [HttpPost("authorize")]
  public async Task<ActionResult> Authorize([FromBody] AuthorizeRequest authorizeRequest)
  {
    return await _useCases.Authorize(authorizeRequest.access_token);
  }
  
  [HttpPost("refresh")]
  public async Task<ActionResult> Refresh([FromBody] RefreshRequest refreshRequestAuth)
  {
    return await _useCases.Refresh();
  }
}