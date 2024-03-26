using Application.Utils;

namespace Application.Models;

public class Tokens
{
  public Guid Id { get; private set; }
  public string AccessToken { get; private set; }
  public string RefreshToken { get; private set; }
  public DateTime ExpiresAt { get; private set; }
  
  public Tokens() : this(Guid.NewGuid(), TokenService.GenerateAccessToken(), 
    TokenService.GenerateRefreshToken(), DateTime.UtcNow + TimeSpan.FromMinutes(20)) {}
  public Tokens(Guid id) : this(id, TokenService.GenerateAccessToken(), 
    TokenService.GenerateRefreshToken(), DateTime.UtcNow + TimeSpan.FromMinutes(20)) {}
  public Tokens(Guid id, string accessToken, string refreshToken, DateTime expiresAt)
    => (Id, AccessToken, RefreshToken, ExpiresAt) = (id, accessToken, refreshToken, expiresAt);
}