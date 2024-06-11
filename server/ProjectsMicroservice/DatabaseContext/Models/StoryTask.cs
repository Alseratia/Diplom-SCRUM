using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class StoryTask
{
  [Key]
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public string Text { get; set; } = null!;
  public bool IsDone { get; set; }
  public Guid UserStoryId { get; set; }

  [Required]
  [ForeignKey(nameof(UserStoryId))]
  public virtual UserStory UserStory { get; set; } = null!;
}