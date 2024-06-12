using System.ComponentModel.DataAnnotations;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Controllers.Requests;

public class CreateUserStoryRequest
{
  [Required]
  public string Title { get; set; } = null!;
  [Required]
  public string Text { get; set; } = null!;
  [Required]
  public Priority Priority { get; set; } 
}