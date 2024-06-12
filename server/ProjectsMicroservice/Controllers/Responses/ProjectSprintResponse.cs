namespace ProjectsMicroservice.Controllers.Responses;

public class SprintResponse
{
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public DateTime? Start { get; set; }
  public DateTime? End { get; set; }
  public DateTime CreatedAt { get; set; }
}