using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.Controllers.Responses;

public class TaskResponse
{
  public Guid Id { get; set; }
  [Required]
  public string Title { get; set; } = null!;
  [Required]
  public string Text { get; set; } = null!;
  public bool IsDone { get; set; }
}