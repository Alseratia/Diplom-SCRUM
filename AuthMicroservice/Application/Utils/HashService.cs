using System.Security.Cryptography;
using System.Text;

namespace Application.Utils;

public static class HashService
{
  public static string GenerateHash(string password, string salt)
  {
    var passwordBytes = Encoding.UTF8.GetBytes(password + salt);

    var hashBytes = SHA256.HashData(passwordBytes);
    return Convert.ToBase64String(hashBytes);
  }

  public static string GenerateSalt()
  {
    var saltBytes = new byte[16];
    using (var rng = RandomNumberGenerator.Create())
    {
      rng.GetBytes(saltBytes);
    }
    return Convert.ToBase64String(saltBytes);
  }
}