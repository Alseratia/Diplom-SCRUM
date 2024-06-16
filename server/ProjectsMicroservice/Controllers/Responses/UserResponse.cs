namespace ProjectsMicroservice.Controllers.Responses;

public class UserResponse
{
  public string UserId { get; set; } = null!;
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
}