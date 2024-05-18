using AuthMicroservice.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AuthMicroservice;

public partial class UseCases
{
  public async Task<ActionResult<CreateUserDto>> CreateUser(string email, string password, string name)
  {
    if (await _db.GetByEmail(email) != null) return new ConflictResult();

    var newUser = _db.CreateUser(email, password, name);
    var newUserDto = new CreateUserDto() { Id = newUser.Id };
    return new CreatedResult(nameof(CreateUser), newUserDto);
  }
}




