using System.ComponentModel.DataAnnotations;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Controllers.Responses;

public class UserProjectResponse
{
  public Guid Id { get; set; }
  [Required]
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
  public Role Role { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? ClosedAt { get; set; }
}