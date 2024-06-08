namespace ProjectsMicroservice.Controllers.Requests;

public class CreateUserStoryRequest
{
  public string Title { get; set; } = null!;
  public string Text { get; set; } = null!;
}