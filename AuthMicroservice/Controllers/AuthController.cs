using Application.DTO;
using Application.UseCases;
using Controllers.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("api/v1")]
public class AuthController : ControllerBase
{
  private readonly UseCases _useCases;
  public AuthController(UseCases useCases) => _useCases = useCases;

  [HttpPost("register")]
  public ActionResult<CreateUserDto> CreateUser([FromBody] RegisterDto registerDto)
  {
    return _useCases.CreateUser(registerDto.Email, registerDto.Password, registerDto.Name);
  }
  
  [HttpPost("login")]
  public ActionResult<NewTokensDto> NewTokens([FromBody] LoginDto registerDto)
  {
    return _useCases.NewTokens(registerDto.Email, registerDto.Password);
  }
}