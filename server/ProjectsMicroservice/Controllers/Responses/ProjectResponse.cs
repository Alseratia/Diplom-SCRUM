using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.Controllers.Responses;

public class ProjectResponse
{
  public Guid Id { get; set; }
  [Required]
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? ClosedAt { get; set; }
}