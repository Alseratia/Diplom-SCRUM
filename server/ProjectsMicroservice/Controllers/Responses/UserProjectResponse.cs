using System.ComponentModel.DataAnnotations;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Controllers.Responses;

public class UserProjectResponse
{
  [Required]
  public string Id { get; set; } = null!;
  [Required]
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
  public Role Role { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? ClosedAt { get; set; }
}