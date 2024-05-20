using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AuthMicroservice.DataAccess.Models;
using Microsoft.IdentityModel.Tokens;

namespace AuthMicroservice.Utils;

public static class JwtTokenService
{
  public const string SecretKey = "12DD91672632AF1E01A5896DA559E8F7";
  public const int ExpiresInMin = 30;


  public static Tokens GenerateJwtTokens(User user)
  {
    return new Tokens()
    {
      Id = Guid.NewGuid(),
      AccessToken = GenerateAccessToken(user),
      RefreshToken = GenerateRefreshToken(),
      ExpiresAt = DateTime.Now.AddMinutes(ExpiresInMin)
    };
  }

  private static string GenerateAccessToken(User user)
  {
    var tokenExpiresTimeStamp = DateTime.Now.AddMinutes(ExpiresInMin);
    var tokenKey = Encoding.ASCII.GetBytes(SecretKey);
    var userClaims = new ClaimsIdentity(new List<Claim>()
    {
      new Claim(JwtRegisteredClaimNames.Name, user.Name),
      new Claim("UserId", user.Id.ToString())
    });

    var signingCredentials = new SigningCredentials(
      new SymmetricSecurityKey(tokenKey),
      SecurityAlgorithms.HmacSha256Signature);

    var securityTokenDescriptor = new SecurityTokenDescriptor()
    {
      Subject = userClaims,
      Expires = tokenExpiresTimeStamp,
      SigningCredentials = signingCredentials
    };

    var handler = new JwtSecurityTokenHandler();
    var securityToken = handler.CreateToken(securityTokenDescriptor);

    return handler.WriteToken(securityToken);
  }

  private static string GenerateRefreshToken()
  {
    var randomNumber = new byte[32];
    using (var rng = RandomNumberGenerator.Create())
    {
      rng.GetBytes(randomNumber);
      return Convert.ToBase64String(randomNumber);
    }
  }
}