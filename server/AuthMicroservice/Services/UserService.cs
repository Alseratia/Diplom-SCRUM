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


  public async Task<ActionResult<LoginResponse>> Register(string email, string password)
  {
    if (await _db.GetByEmailAsync(email) != null) return new ConflictResult();

    var newUser = await _db.CreateUserAsync(email, password);
    return new LoginResponse(newUser);
  }
  
  public async Task<ActionResult<LoginResponse>> Login(string email, string password)
  {
    var user = await _db.GetByEmailAsync(email);
    if (user == null) return new NotFoundResult();

    if (!HashService.IsPasswordEquals(password, user.PasswordHash, user.Salt)) 
      return new UnauthorizedResult();

    await _db.CreateTokens(user);

    return new LoginResponse(user);
  }
  
  public async Task<ActionResult<RefreshResponse>> RefreshTokens(string accessToken, string refreshToken)
  {
    var tokens = await _db.Tokens.Include(x => x.User)
      .SingleOrDefaultAsync(x => x.AccessToken == accessToken && x.RefreshToken == refreshToken);
    if (tokens == null || tokens.User == null) return new UnauthorizedResult();

    var user = tokens.User;
    await _db.CreateTokens(user);

    return new RefreshResponse(user);
  }
}