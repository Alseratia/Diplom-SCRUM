using System.ComponentModel.DataAnnotations;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Controllers.Responses;

public class MembersResponse
{
  public Guid Id { get; set; }
  public Role Role { get; set; }
  public Guid UserId { get; set; }
  [Required]
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
}