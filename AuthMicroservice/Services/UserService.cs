using AuthMicroservice.Controllers.Responses;
using AuthMicroservice.DataAccess;
using AuthMicroservice.DataAccess.Models;
using AuthMicroservice.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroservice;

public class UserService
{
  private readonly ApplicationDbContext _db;
  public UserService(ApplicationDbContext db) => (_db) = (db);


  public async Task<ActionResult<RegisterResponse>> Register(string email, string name, string password)
  {
    if (await _db.GetByEmail(email) != null) return new ConflictResult();

    var newUser = _db.CreateUser(email, password, name);
    var newUserDto = new RegisterResponse() { Id = newUser.Id };
    return new CreatedResult(nameof(RegisterResponse), newUserDto);
  }
  
  public async Task<ActionResult<LoginResponse>> Login(string email, string password)
  {
    var user = await _db.GetByEmail(email);
    if (user == null) return new NotFoundResult();

    if (!HashService.IsPasswordEquals(password, user.PasswordHash, user.Salt)) 
      return new UnauthorizedResult();

    var tokens = await CreateUserTokens(user);

    return new LoginResponse()
      { 
        AccessToken = tokens.AccessToken, 
        RefreshToken = tokens.RefreshToken, 
        ExpiresIn = (int)tokens.ExpiresAt.Subtract(DateTime.Now).TotalSeconds
      };
  }
  
  public async Task<ActionResult<LoginResponse>> RefreshTokens(string accessToken, string refreshToken)
  {
    //проверка из контекста
    var tokens = await _db.Tokens.Include(x => x.User)
      .SingleOrDefaultAsync(x => x.AccessToken == accessToken && x.RefreshToken == refreshToken);
    if (tokens == null || tokens.User == null) return new UnauthorizedResult();

    tokens = await CreateUserTokens(tokens.User);

    return new LoginResponse()
    { 
      AccessToken = tokens.AccessToken, 
      RefreshToken = tokens.RefreshToken, 
      ExpiresIn = (int)tokens.ExpiresAt.Subtract(DateTime.Now).TotalSeconds
    };
  }

  private async Task<Tokens> CreateUserTokens(User user)
  {
    if (user.Tokens != null) _db.Tokens.Remove(user.Tokens);
    user.TokensId = null;
    user.Tokens = null;
    
    var tokens = JwtTokenService.GenerateJwtTokens(user);
    tokens.User = user;
    
    _db.Tokens.Add(tokens);
    
    await _db.SaveChangesAsync();
    return tokens;
  }
}