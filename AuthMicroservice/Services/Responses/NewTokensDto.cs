namespace AuthMicroservice.DTO;

public class NewTokensDto
{
  public string AccessToken { get; set; } = null!;
  public string RefreshToken { get; set; } = null!;
  public DateTime ExpiresAt { get; set; }
}