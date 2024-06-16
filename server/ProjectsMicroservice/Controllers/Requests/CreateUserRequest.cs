using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.Controllers.Requests;

public class CreateUserRequest
{
  [Required]
  public Guid UserId { get; set; }
  [Required]
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
}