namespace Domain;

public class Tokens
{
  public Guid Id { get; private set; }
  public string AccessToken { get; private set; }
  public string RefreshToken { get; private set; }
  public DateTime ExpiresAt { get; private set; }

  public Tokens()
  {
    Id = Guid.NewGuid();
    AccessToken = "";
    RefreshToken = "";
    ExpiresAt = DateTime.Now + TimeSpan.FromMinutes(20);
  }

  public Tokens(Guid id, string accessToken, string refreshToken, DateTime expiresAt)
    => (Id, AccessToken, RefreshToken, ExpiresAt) = (id, accessToken, refreshToken, expiresAt);
}