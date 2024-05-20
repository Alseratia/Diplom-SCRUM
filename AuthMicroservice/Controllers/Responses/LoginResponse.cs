namespace AuthMicroservice.Controllers.Responses;

public class LoginResponse
{
  public string AccessToken { get; set; } = null!;
  public string RefreshToken { get; set; } = null!;
  public long ExpiresIn { get; set; }
}