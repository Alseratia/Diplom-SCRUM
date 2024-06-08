namespace ProjectsMicroservice.Controllers.Responses;

public class StoryTaskResponse
{
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public string Text { get; set; } = null!;
  public bool IsDone { get; set; }
}