using System.ComponentModel.DataAnnotations;
using ProjectsMicroservice.DatabaseContext.Enums;
using ProjectsMicroservice.DatabaseContext.Models;

namespace ProjectsMicroservice.Controllers.Responses;

public class UserStoryResponse
{
  public Guid Id { get; set; }
  [Required]
  public string Title { get; set; } = null!;
  [Required]
  public string Text { get; set; } = null!;
  public Priority Priority { get; set; }
  public int? Mark { get; set; }
  public StoryStatus Status { get; set; }
  public DateTime? Start { get; set; }
  public DateTime? End { get; set; }
  public Guid? UserId { get; set; }

  public ICollection<StoryTaskResponse> Tasks { get; set; } = null!;
}