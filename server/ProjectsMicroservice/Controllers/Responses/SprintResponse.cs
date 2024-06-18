using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Controllers.Responses;

public class SprintResponse
{
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public SprintStatus Status { get; set; }
  public DateTime? Start { get; set; }
  public DateTime? End { get; set; }
  public DateTime CreatedAt { get; set; }
}