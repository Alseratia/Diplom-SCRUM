using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.Controllers.Requests;

public class CreateStoryTaskRequest
{
  [Required]
  public string Title { get; set; } = null!;
  [Required]
  public string Text { get; set; } = null!;
}