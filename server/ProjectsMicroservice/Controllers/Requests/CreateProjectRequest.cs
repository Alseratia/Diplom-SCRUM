using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.Controllers.Requests;

public class CreateProjectRequest
{
  [Required]
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
}