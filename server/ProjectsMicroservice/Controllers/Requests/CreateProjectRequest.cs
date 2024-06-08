namespace ProjectsMicroservice.Controllers.Requests;

public class CreateProjectRequest
{
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
}