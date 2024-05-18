namespace AuthMicroservice.Utils;

public static class TokenService
{
  public static string GenerateAccessToken()
  {
    return "access_token";
  }
  public static string GenerateRefreshToken()
  {
    return "refresh_token";
  }
}