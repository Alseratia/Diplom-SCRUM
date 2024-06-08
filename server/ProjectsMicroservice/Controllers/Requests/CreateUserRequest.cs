namespace ProjectsMicroservice.Controllers.Requests;

public class CreateUserRequest
{
  public Guid UserId { get; set; }
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
}