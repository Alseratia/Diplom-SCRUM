using Application.Utils;

namespace Application.Models;

public class User
{
  public Guid Id { get; private set; }
  public string Name { get; private set; }
  public string Email { get; private set; }
  public string PasswordHash { get; private set; }
  public string Salt { get; private set; }
    
  public Tokens? Tokens { get; private set; }

  public User(string email, string password, string name)
  {
    Id = Guid.NewGuid();
    Email = email;
    Salt = HashService.GenerateSalt();
    PasswordHash = HashService.GenerateHash(password, Salt);
    Name = name;
  }

  public bool VerifyPassword(string password)
  {
    var passwordHash = HashService.GenerateHash(password, Salt);
    return PasswordHash == passwordHash;
  }
}