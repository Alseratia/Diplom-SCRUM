using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
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
}