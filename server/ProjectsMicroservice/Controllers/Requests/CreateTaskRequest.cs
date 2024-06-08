namespace ProjectsMicroservice.Controllers.Requests;

public class CreateStoryTaskRequest
{
  public string Title { get; set; } = null!;
  public string Text { get; set; } = null!;
}