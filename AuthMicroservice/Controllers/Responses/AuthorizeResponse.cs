namespace AuthMicroservice.Controllers.Responses;

public class AuthorizeResponse
{
  public string AccessToken { get; set; } = null!;
  public string RefreshToken { get; set; } = null!;
  public int ExpiresIn { get; set; }
}