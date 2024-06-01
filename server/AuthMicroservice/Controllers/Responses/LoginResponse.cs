using AuthMicroservice.DataAccess.Models;

namespace AuthMicroservice.Controllers.Responses;

public class LoginResponse
{
  public LoginResponse(User user)
  {
    UserId = user.Id.ToString();
    AccessToken = user.Tokens!.AccessToken;
    RefreshToken = user.Tokens!.RefreshToken;
    ExpiresIn = (int)user.Tokens!.ExpiresAt.Subtract(DateTime.Now).TotalSeconds;
  }
  public string UserId { get; set; }
  public string AccessToken { get; set; }
  public string RefreshToken { get; set; }
  public long ExpiresIn { get; set; }
}